import { CreateCategoryParams } from './../repositories/category-repository/index';
// import { CreateCategoryParams } from "@/services";
import Joi from "joi";

export const categorySchema = Joi.object<CreateCategoryParams>({
  name: Joi.string().required(),
});
