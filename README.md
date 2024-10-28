# Framework

Framework es un framework web ligero, escrito en Node.js y TypeScript, diseñado para simplificar la creación de aplicaciones RESTful con un manejo eficiente de rutas y middlewares.

Tabla de Contenidos

* Características
* Instalación
* Ejemplo de Uso
* Estructura de Carpetas
* API
  * Router
  * MiddlewareManager
  * RequestHandlerService
* Configuración
* Pruebas
* Contribuciones
* Licencia

## Características

* Enrutamiento Dinámico: Permite crear rutas dinámicamente y manejar parámetros de ruta.
* Middlewares Flexibles: Maneja middlewares de forma eficiente para añadir funciones como validación, logging y más.
* Soporte para JSON y Respuestas Personalizadas: Incluye métodos extendidos de respuesta como res.json para facilitar la creación de API REST.
* Modular y Extensible: Construido para facilitar el uso de dependencias y ser extendido con nuevos módulos.

## Instalación

``` Typescript
npm install myframework
```

## Ejemplo de Uso

### Crear un Servidor Básico

``` typescript
import { MyFramework, Router, MiddlewareManager, RequestHandlerService } from 'myframework';

const app = new MyFramework();
const router = new Router();
const middlewareManager = new MiddlewareManager();
const requestHandler = new RequestHandlerService(middlewareManager, router);

// Define middlewares
middlewareManager.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Define rutas
router.get('/hello', (req, res) => {
  res.end('Hello, world!');
});

app.use('/', router);
app.listen(3000, () => {
  console.log('Servidor en ejecución en http://localhost:3000');
});
```

## Estructura de Carpetas

``` bash
/framework
|-- /lib
|   |-- MyFramework.ts        # Configuración y arranque del servidor
|   |-- Router.ts             # Módulo de rutas
|   |-- MiddlewareManager.ts  # Módulo para gestión de middlewares
|   |-- RequestHandlerService.ts  # Servicio de manejo de solicitudes
|-- /examples                 # Ejemplos de uso del framework
|-- /tests                    # Tests del framework
|-- tsconfig.json             # Configuración de TypeScript
|-- README.md                 # Documentación
```

## API

### Router

Permite definir y manejar rutas de diferentes métodos HTTP.

#### Métodos Router

* get(path: string, handler: Handler): Define una ruta GET.
* post(path: string, handler: Handler): Define una ruta POST.
* put(path: string, handler: Handler): Define una ruta PUT.
* delete(path: string, handler: Handler): Define una ruta DELETE.

### MiddlewareManager

Clase que administra middlewares y asegura su ejecución en el orden registrado.

#### Métodos MiddlewareManager

* use(middleware: Middleware): Registra un middleware que será ejecutado para cada solicitud.
* executeMiddlewares(req: Request, res: Response, next: () => void): Ejecuta todos los middlewares en orden.

### RequestHandlerService

Gestiona la solicitud y procesa la ruta.

#### Métodos RequestHandlerService

* handleRequest(req: Request, res: Response): Ejecuta los middlewares y resuelve la ruta correspondiente a la solicitud.

## Configuración

### tsconfig.json

Para soportar varias carpetas raíz y el uso de TypeScript, configura tu tsconfig.json de la siguiente manera:

``` json
{
  "compilerOptions": {
    "outDir": "./dist",
    "target": "ES6",
    "module": "commonjs",
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "typeRoots": [
      "./global.d.ts",
      "lib/Types/Utils.d.ts",
      "./node_modules/@types"
    ],
    "paths": {
      "@src/*": ["./lib/*"],
      "@tests/*": ["./tests/*"]
    }
  },
  "include": [
    "lib/**/*",
    "examples/**/*",
    "tests/**/*",
  ]
}
```

### Configuración del Servidor

Al iniciar una instancia de MyFramework, puedes pasar opciones adicionales para configurar el entorno y los módulos de respuesta personalizados.

## Pruebas

Para ejecutar los tests, instala Jest:

``` bash
npm install --save-dev jest
```

Luego, puedes ejecutar las pruebas con:

```bash
npm run test
```

## Licencia

Este proyecto está bajo la Licencia MIT.
