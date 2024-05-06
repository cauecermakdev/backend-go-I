import { Router } from "express";
import { authenticateToken, validateBody } from "@/middlewares";
import { 
  getCategoriesController,
  postCategoryController, 
  getUserCategoriesController,
  getUsersByCategoriesController
} from "@/controllers";
import { categorySchema } from "@/schemas";

const categoryRouter = Router();

categoryRouter
  .get("/categories", getCategoriesController)
  .post("/all-users", getUsersByCategoriesController)
  .all("/*", authenticateToken)
  .get("/user", getUserCategoriesController)
  .post("/categories", validateBody(categorySchema), postCategoryController);

export { categoryRouter };
