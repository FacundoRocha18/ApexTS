import { framework } from "../../lib/app";
import { IRouter } from "../../lib/Interfaces/Router.interface";
import { Request, Response } from "../types";

const router: IRouter = framework.router;

router.get("/products", (req, res) => {
  res.statusCode = 200;
  res.end("Products Route");
});

router.get("/products/:category/:id", (req: Request, res: Response) => {
  const params = req.params;
  const query = req.query;
  const { id, category } = params;

  const response = {
    productId: id,
    productCategory: category,
    query,
  };

  res.setHeader("Content-type", "application/json");
  res.statusCode = 200;
  res.end(JSON.stringify(response));
});
