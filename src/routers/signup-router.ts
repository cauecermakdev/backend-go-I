import { Router } from "express";
import { validateBody } from "@/middlewares";
import { usersPost } from "@/controllers";
import { createUserSchema } from "@/schemas";

const signupRouter = Router();

signupRouter
  .post("/", validateBody(createUserSchema), usersPost);

export { signupRouter };
