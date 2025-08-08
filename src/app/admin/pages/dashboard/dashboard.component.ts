import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Subscription } from 'rxjs';
import { AdminProductsService } from '../../services/admin-product.service';
import { Product } from '../../../shared/models/product';
import { UpsertProductFormComponent } from '../../components/upsert-product-form/upsert-product-form.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterModule, MatIconModule, MatButtonModule, UpsertProductFormComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export default class DashboardComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  isLoading = true;
  showCreateForm = false;
  editingProductId: string | null = null;
  private subscription = new Subscription();

  constructor(private adminProductsService: AdminProductsService) {}

  ngOnInit() {
    this.loadProducts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private loadProducts() {
    this.subscription.add(
      this.adminProductsService.products$.subscribe({
        next: (products) => {
          this.products = products;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading products:', error);
          this.isLoading = false;
        }
      })
    );
  }

  onCreateProduct() {
    this.showCreateForm = true;
    this.editingProductId = null;
  }

  onEditProduct(productId: string) {
    this.editingProductId = productId;
    this.showCreateForm = true;
  }

  onDeleteProduct(productId: string) {
    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
      this.adminProductsService.deleteProduct(productId).subscribe({
        next: () => {
          console.log('Producto eliminado correctamente');
        },
        error: (error) => {
          console.error('Error al eliminar producto:', error);
        }
      });
    }
  }

  onFormClose() {
    this.showCreateForm = false;
    this.editingProductId = null;
  }

  onProductSaved() {
    this.showCreateForm = false;
    this.editingProductId = null;
    // Los productos se actualizarán automáticamente a través del observable
  }
}
