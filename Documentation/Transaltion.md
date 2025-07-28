# Traducción usando el paquete Localize

## 1. Instalar angular/localize

ng add @angular/localize

## 2. Utilización:

- Añadir las eitquetas i18n a las plantillas

```html
<p i18n="@@uniqueIdForSubtitle">Texto original</p>
```
- Ejecutar el comando para extraer
```bash
ng extract-i18n

```

Esto generará un archivo messages.xlf en la raíz del proyecto.


## 