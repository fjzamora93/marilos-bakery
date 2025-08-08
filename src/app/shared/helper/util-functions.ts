export function optimizeImageForWeb(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };

    img.onload = () => {
      const canvas = document.createElement('canvas');

      // ↓ Cambia el tamaño si lo deseas (p. ej., ancho máx de 1000px)
      const maxWidth = 1000;
      const scale = Math.min(1, maxWidth / img.width);

      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Canvas no soportado');

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // ↓ Convierte a WebP (puedes usar 'image/jpeg' si prefieres)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject('Error al convertir la imagen');
          }
        },
        'image/webp', // Puedes cambiar a 'image/jpeg'
        0.8 // Calidad entre 0 y 1
      );
    };

    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}