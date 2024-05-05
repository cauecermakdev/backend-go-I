import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { 
  getUsersByLocationController
} from "@/controllers";

const locationRouter = Router();

locationRouter
  .all("/*", authenticateToken)
  .get("/all-users", getUsersByLocationController);

export { locationRouter };
