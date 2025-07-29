# Modo desarrollo 
ng serve --configuration=es --port=4200
ng serve --configuration=en --port=4300


# DEploy en Hostinger

Es necesario crear un archivo .htaccess, donde se puede hacer un rewrite para que toda slas rutas del SPA funcionen correctamente. 

```.htaccess
RewriteEngine On

# Si la URL empieza por /en, sirve /en/index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^en(/.*)?$ /en/index.html [L]

# Si la URL empieza por /es, sirve /es/index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^es(/.*)?$ /es/index.html [L]

# Si no hay prefijo, redirige a /es/
RewriteRule ^$ /es/index.html [L]
```


# Pasos para subir:

1. Tras hacer una actualizacion del proyecto o una traducción, extraer los nuevos textos:

ng extract-i18n --output-path=src/assets/i18n --out-file=messages.xlf

2. Ahora generar los builds localizados
 
ng build --localize