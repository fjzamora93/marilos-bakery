import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-drag-and-drop',
  imports: [],
  standalone: true,
  templateUrl: './drag-and-drop.component.html',
  styleUrl: './drag-and-drop.component.scss'
})
export class DragAndDropComponent {

@Output() imageSelected = new EventEmitter<File>();

  isDragOver = false;

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver = false;

    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.emitFileIfImage(file);
    }
  }

  onFileInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.emitFileIfImage(input.files[0]);
    }
  }

  private emitFileIfImage(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Por favor, selecciona un archivo de imagen válido.');
      return;
    }
    this.imageSelected.emit(file);
  }
}