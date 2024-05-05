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
  .all("/*", authenticateToken)
  .get("/all-users", getUsersByCategoriesController)
  .get("/user", getUserCategoriesController)
  .post("/categories", validateBody(categorySchema), postCategoryController);

export { categoryRouter };
