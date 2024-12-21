import { Router, container } from "@apex.ts";

import { CustomersController } from "./customers-controller";

const customersController = container.resolve(CustomersController);

export const router = container.resolve(Router);

router.get("/customers/all", customersController.findAll);

router.get("/customers/:id", customersController.findOne);

router.post("/customers/create", customersController.create);

router.del("/customers/:id", customersController.delete);
