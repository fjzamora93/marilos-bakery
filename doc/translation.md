# Pasos para la traducción

1. Crear un translate-config.ts para definir la configuración de la traducción.
2. Añadir el provider dle translate-config al app.config.ts, de esta forma es accesible desde todo el proyecto.
3. Crear un language.service.ts, que se encarga de gestionar los cambios de idioma.
4. Ir al top bar y actualizar de la siguietne forma:
   - Incluir una susbscripción al languageSubscritpion.
   - Meter en el constructor el languageSErvice.
   - En el init, arrancar la suscripción al idioma.
   - En el html incluir el sistema para cambiar de idioma