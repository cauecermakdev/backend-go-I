import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import {  getAllUsers } from "@/controllers";

const usersRouter = Router();

usersRouter
  .get("/", getAllUsers)
  .all("/*", authenticateToken);

export { usersRouter };
