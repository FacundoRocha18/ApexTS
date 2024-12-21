# ApexTS

## Framework web ligero con la potencia de TypeScript

Apex.ts es un framework web ligero, escrito en Node.js y TypeScript, diseñado para simplificar la creación de aplicaciones RESTful con un manejo eficiente de rutas y middlewares.

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
npm install apex.ts
```

## Ejemplo de Uso

### Crear un Servidor Básico

```typescript
import "reflect-metadata";

import {
  HttpRequest,
  HttpResponse,
  ApexCore,
  ApexFactory,
  authMiddleware,
  errorHandlerMiddleware,
  loggerMiddleware,
} from "@apex.ts";

import { Customer } from "./customers/customer";
import { Product } from './products/product';

import { router as customersRouter } from "./customers/customers-routes";
import { router as productsRouter } from "./products/products-routes";

const bootstrap = async () => {
  const apexFactory = new ApexFactory();

  const app: ApexCore = await apexFactory.initializeApplication({
    synchronize: false,
    entities: [Customer, Product],
    migrations: [],
    subscribers: [],
  });

  const { NODE_ENV, PORT } = app.EnvConfig;

  app.useMiddleware(authMiddleware);
  app.useMiddleware(loggerMiddleware);
  app.useMiddleware(errorHandlerMiddleware);

  app.useRouter(customersRouter);
  app.useRouter(productsRouter);

  app.options("*", (req: HttpRequest, res: HttpResponse) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.status(204);
    res.end();
  });

  app.listen(PORT, NODE_ENV);
};

bootstrap();
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
    "typeRoots": ["./global.d.ts", "lib/Types/Utils.d.ts", "./node_modules/@types"],
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
