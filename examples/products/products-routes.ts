import { container, Router } from "@apex.ts";

import { ProductsController } from "./products-controller";

const productsController = container.resolve(ProductsController);

export const router = container.resolve(Router);

router.get("/products/list", productsController.findAll);

router.get("/products/element/:id", productsController.findById);

router.get("/products/element/:category", productsController.findByCategory);

router.post("/products/create", productsController.create);
