import { framework } from "../../lib/app";
import { IRouter } from "../../lib/Interfaces/Router.interface";

const router: IRouter = framework.router;

router.get("/", (req, res) => {
  res.statusCode = 200;
  res.end("Route: " + req.url + " HTTP method: " + req.method);
});

export { router };
