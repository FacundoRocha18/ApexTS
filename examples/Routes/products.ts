import { framework } from "../../lib";
import { IRouter } from "../../lib/router/router.interface";
import { getProducts } from '../controllers/get-products';

const router: IRouter = framework.router;

router.get("/products/:category/:id", getProducts);

