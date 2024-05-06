import { AuthenticatedRequest } from "@/middlewares";
import authenticationService, { SignInParams } from '@/services/authentication-service';
import categoryService from '@/services/category-service';
import { Request, Response } from 'express';
import httpStatus from 'http-status';

export async function getUsersByCategoriesController(req: AuthenticatedRequest, res: Response) {
  try {
    console.log("aqui");
    console.log(req.body);
    const { category } = req.body; 
    const categories = await categoryService.getUsersByCategoriesService(category);
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getCategoriesController(req: Request, res: Response) {
  try {
    const categories = await categoryService.getCategoriesService();
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getUserCategoriesController(req: AuthenticatedRequest, res: Response) {
  try {
    const { userId } = req;
    const categories = await categoryService.getUserCategoryService(userId);
    return res.status(httpStatus.OK).send(categories);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postCategoryController(req: AuthenticatedRequest, res: Response) {
  try {
    await categoryService.createOrUpdateCategoryService({
      ...req.body,
      userId: req.userId,
    });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
