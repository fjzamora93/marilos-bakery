# Traducción usando el paquete Localize

Psamos de usar ngx-translate a otro paquete: angular/localize

## 1. Instalar angular/localize

ng add @angular/localize

## 2. Utilización:

- Añadir las eitquetas i18n a las plantillas

```html
<p i18n="@@uniqueIdForSubtitle">Texto original</p>
```
- Ejecutar el comando para extraer
```bash
ng extract-i18n --output-path=src/assets/i18n --out-file=messages.xlf

```

Esto generará un archivo messages.xlf en la raíz del proyecto. A partir de ahí, es simplemente duplicar los archivos y traducirlos de esta manera:
- messages.es.xlf
- messages.en.xlf


## COnfigurar Angular para usar los nuevos builds por idiomas

En angular.json hay que incorporar este texto:

```json
"i18n": {
  "sourceLocale": "es",
  "locales": {
    "en": "src/messages.en.xlf"
  }
}
```

LUego en los configurations de tus builds hacer esto:


```json
        "projects": {
        "tu-proyecto": {
        "architect": {
        "build": {
                "options": { ... },
                "configurations": {
                "production": { ... },
                "es": {
                "localize": ["es"]
                },
                "en": {
                "localize": ["en"]
                }
                }
        },
        "serve": {
                "configurations": {
                "es": {
                "browserTarget": "tu-proyecto:build:es"
                },
                "en": {
                "browserTarget": "tu-proyecto:build:en"
                }
                }
        }
        }
        }
        }

```



##  Crear un archvio en la raíz del proyecto llamado tsconfig.server.json

```
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "outDir": "./out-tsc/server",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "types": ["node"]
  },
  "files": [
    "src/main.server.ts",
    "src/server.ts"
  ]
}
```

## Modificar el angular.json > architect y añadir una sección ser 'server'

```json
 "server": {
          "builder": "@angular-devkit/build-angular:server",
          "options": {
            "outputPath": "dist/marilos-bakery-server",
            "main": "src/main.server.ts",
            "tsConfig": "tsconfig.server.json"
          },
          "configurations": {
            "production": {
              "localize": ["es", "en"]
            },
            "es": {
              "localize": ["es"]
            },
            "en": {
              "localize": ["en"]
            }
          },
          "defaultConfiguration": "production"
        },

```



## MOdificar el app.routes.ts para añadir las rutas del idioma

```js

 {
    path: ':lang',
    children: [
      {
        path: '',
        loadComponent: () => import('../app/shared/layout/layout.component').then(m => m.default),
        loadChildren: () => import('../app/products/product.routes').then(m => m.default),
      }
    ]
  }
```



GEneramos los builds localizadas para cada idioma:

ng build --configuration=es
ng build --configuration=en

o alternativamente:

ng run marilos-bakery:server:es
ng run marilos-bakery:server:en


o este otro:

     ng build --localize
     ng run marilos-bakery:server:es
     ng run marilos-bakery:server:en

## SErvir las versiones por idioma

/es/index.html 
/en/index.html


