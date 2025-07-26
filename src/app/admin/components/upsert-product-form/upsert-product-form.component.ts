import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AdminProductsService } from '../../services/admin-product.service';
import { Product } from '../../../products/models/product';
import { AuthService } from '../../../../core/auth/auth.service';
import { Category } from '@app/products/models/category';

@Component({
  selector: 'app-upsert-product-form',
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './upsert-product-form.component.html',
  styleUrl: './upsert-product-form.component.scss'
})
export class UpsertProductFormComponent implements OnInit, OnDestroy {
  @Input() productId: string | null = null;
  @Output() closeForm = new EventEmitter<void>();
  @Output() productSaved = new EventEmitter<void>();

  productForm: FormGroup;
  isLoading = false;
  isEditMode = false;
  selectedImageFile: File | null = null;
  imagePreview: string | null = null;
  private subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private adminProductsService: AdminProductsService,
    private authService: AuthService
  ) {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      price: ['', [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductData();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadProductData() {
    if (!this.productId) return;

    this.isLoading = true;
    this.subscription.add(
      this.adminProductsService.getProductDetail(this.productId).subscribe({
        next: (product) => {
          if (product) {
            this.productForm.patchValue({
              name: product.name,
              description: product.description,
              price: product.price,
              imageUrl: product.imageUrl
            });
            this.imagePreview = product.imageUrl || null; 
            this.selectedImageFile = null; 
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading product:', error);
          this.isLoading = false;
        }
      })
    );
  }

  onImageSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedImageFile = fileInput.files[0];

      // Mostrar vista previa
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImageFile);
    }
  }

 onSubmit() {
    if (this.productForm.invalid) {
      this.markFormGroupTouched();
      return;
    }

    if (!this.selectedImageFile && !this.isEditMode) {
      console.error('Debes seleccionar una imagen.');
      // Puedes mostrar un mensaje al usuario aquí
      return;
    }

    const currentUser = this.authService.currentUser;
    if (!currentUser) {
      console.error('Usuario no autenticado');
      return;
    }

    this.isLoading = true;
    const formData = this.productForm.value;

    if (this.isEditMode && this.productId) {
      this.subscription.add(
        this.adminProductsService.updateProduct(
          this.productId,
          {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            updatedAt: new Date()
          },
          this.selectedImageFile 
        ).subscribe({
          next: () => {
            this.productSaved.emit();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error updating product:', error);
            this.isLoading = false;
          }
        })
      );
    } else {
      // Crear nuevo producto
      const newProduct: Partial<Product> = {
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        category: Category.SWEETS,
        slug: this.generateSlug(formData.name),
        seoTitle: formData.name,
        seoDescription: formData.description,
        seoKeywords: formData.name.split(' ').join(', '),
        createdAt: new Date(),
        updatedAt: new Date(),
        userUid: currentUser.uid
      };

      this.subscription.add(
        this.adminProductsService.createProduct(
          newProduct as Product,
          this.selectedImageFile!
        ).subscribe({
          next: () => {
            this.productSaved.emit();
            this.isLoading = false;
          },
          error: (error) => {
            console.error('Error creating product:', error);
            this.isLoading = false;
          }
        })
      );
    }
  }


  private generateSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  private markFormGroupTouched() {
    Object.keys(this.productForm.controls).forEach(key => {
      const control = this.productForm.get(key);
      control?.markAsTouched();
    });
  }

  onCancel() {
    this.closeForm.emit();
  }

  getErrorMessage(fieldName: string): string {
    const control = this.productForm.get(fieldName);
    if (control?.errors && control?.touched) {
      if (control.errors['required']) {
        return `${fieldName} es requerido`;
      }
      if (control.errors['minlength']) {
        return `${fieldName} debe tener al menos ${control.errors['minlength'].requiredLength} caracteres`;
      }
      if (control.errors['min']) {
        return `${fieldName} debe ser mayor a 0`;
      }
    
    }
    return '';
  }
}
