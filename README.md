# SwiftTS
## Lightweight framework with TypeScript power.

Framework es un framework web ligero, escrito en Node.js y TypeScript, diseñado para simplificar la creación de aplicaciones RESTful con un manejo eficiente de rutas y middlewares.

Tabla de Contenidos

- Características
- Instalación
- Ejemplo de Uso
- Estructura de Carpetas
- API
  - Router
  - MiddlewareManager
  - RequestHandlerService
- Configuración
- Pruebas
- Contribuciones
- Licencia

## Características

- Enrutamiento Dinámico: Permite crear rutas dinámicamente y manejar parámetros de ruta.
- Middlewares Flexibles: Maneja middlewares de forma eficiente para añadir funciones como validación, logging y más.
- Soporte para JSON y Respuestas Personalizadas: Incluye métodos extendidos de respuesta como res.json para facilitar la creación de API REST.
- Modular y Extensible: Construido para facilitar el uso de dependencias y ser extendido con nuevos módulos.

## Instalación

```Typescript
npm install swiftts
```

## Ejemplo de Uso

### Crear un Servidor Básico

```typescript
import {
  MyFramework,
  Router,
  MiddlewareManager,
  RequestHandlerService,
} from "myframework";

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
router.get("/hello", (req, res) => {
  res.end("Hello, world!");
});

app.use("/", router);
app.listen(3000, () => {
  console.log("Servidor en ejecución en http://localhost:3000");
});
```

## Estructura de Carpetas

```bash
/framework
|-- /__tests__  # Tests del framework
|-- /examples  # Ejemplos de uso del framework
|-- /lib
|   |-- /application  # Módulo de la aplicación
|   |   |-- framework.interface.ts  # Interfaz de IFramework
|   |   |-- framework.ts  # Clase principal del framework
|   |-- /config  # Módulo de configuración
|   |   |-- environment-config.ts   # Configuración del ambiente
|   |   |-- framework-config.ts     # Configuración y arranque del servidor
|   |-- /errors  # Módulo de errores
|   |   |-- /middlewares
|   |   |   |-- middleware-error.interface.ts  # Interfaz del error de los middlewares
|   |-- /http # Módulo de HTTP
|   |   |-- /request
|   |   |   |-- request-handler.interface.ts  # Interfaz de RequestHandler
|   |   |   |-- request-handler.ts  # Clase RequestHandler
|   |   |-- http-methods.ts  # Librería de métodos HTTP
|   |   |-- http-not-found-exception.ts  # Excepcion para ruta inexistente
|   |-- /interfaces  # Módulo de interfaces generales
|   |   |-- request.interface.ts
|   |   |-- response.interface.ts
|   |-- /middlewares # Módulo de middlewares
|   |   |-- /parsing
|   |   |   |-- json-response-middleware.ts
|   |   |-- middleware-manager.interface.ts
|   |   |-- middleware-manager.ts
|   |   |-- middleware.types.ts
|   |-- /parser  # Módulo de parseo
|   |   |-- parse-params.interface.ts
|   |   |-- parser-service.interface.ts
|   |   |-- parse-service.ts
|   |-- /router  # Módulo de rutas
|   |   |-- route-procesor-service.interface.ts
|   |   |-- route-procesor-service.ts
|   |   |-- router.interface.ts
|   |   |-- router.ts
|   |   |-- router.types.ts
|   |-- /types  # Módulo de tipos
|   |-- index.ts  # Indice de exportación para framework y la configuración del ambiente
|-- .env  # Configuración del ambiente
|-- .env.example  # Configuración del ambiente de ejemplo
|-- tsconfig.json  # Configuración de TypeScript
|-- nodemon.json  # Configuración de Nodemon
|-- package.json  # Configuración de NodeJS
|-- README.md  # Documentación del proyecto
```

## API

### Router

Permite definir y manejar rutas de diferentes métodos HTTP.

#### Métodos Router

- get(path: string, handler: Handler): Define una ruta GET.
- post(path: string, handler: Handler): Define una ruta POST.
- put(path: string, handler: Handler): Define una ruta PUT.
- delete(path: string, handler: Handler): Define una ruta DELETE.

### MiddlewareManager

Clase que administra middlewares y asegura su ejecución en el orden registrado.

#### Métodos MiddlewareManager

- use(middleware: Middleware): Registra un middleware que será ejecutado para cada solicitud.
- executeMiddlewares(req: Request, res: Response, next: () => void): Ejecuta todos los middlewares en orden.

### RequestHandlerService

Gestiona la solicitud y procesa la ruta.

#### Métodos RequestHandlerService

- handleRequest(req: Request, res: Response): Ejecuta los middlewares y resuelve la ruta correspondiente a la solicitud.

## Configuración

### tsconfig.json

Para soportar varias carpetas raíz y el uso de TypeScript, configura tu tsconfig.json de la siguiente manera:

```json
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
  "include": ["lib/**/*", "examples/**/*", "tests/**/*"]
}
```

### Configuración del Servidor

Al iniciar una instancia de MyFramework, puedes pasar opciones adicionales para configurar el entorno y los módulos de respuesta personalizados.

## Pruebas

Para ejecutar los tests, instala Jest:

```bash
npm install --save-dev jest
```

Luego, puedes ejecutar las pruebas con:

```bash
npm run test
```

## Licencia

Este proyecto está bajo la Licencia MIT.
