import { IRouter } from "../../lib/router";
import {
  getTest,
  postTest,
  putTest,
  deleteTest,
  patchTest,
} from "../controllers/tests-controller";

export const testRoutes = (router: IRouter) => {
  router.get("/get-test", getTest);

  router.post("/post-test", postTest);

  router.put("/put-test", putTest);

  router.del("/delete-test", deleteTest);

  router.patch("/patch-test", patchTest);
};
