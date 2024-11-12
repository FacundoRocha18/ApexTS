import { IRouter } from "../../lib/router";
import {
  getTest,
  postTest,
  putTest,
  deleteTest,
  patchTest,
} from "../tests/tests-controller";

export const testsRoutes = (router: IRouter) => {
  router.get("/get-test", getTest);

  router.post("/post-test", postTest);

  router.put("/put-test", putTest);

  router.del("/delete-test", deleteTest);

  router.patch("/patch-test", patchTest);
};
