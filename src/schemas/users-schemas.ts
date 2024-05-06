import { CreateUserParams } from "@/services/users-service";
import Joi from "joi";

export const createUserSchema = Joi.object<CreateUserParams>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  whatsapp: Joi.string().pattern(/^\d{2}\d{9}$/).required(), // Verifica se o whatsapp está no formato correto
  dataNascimento: Joi.date().iso().required(), // Verifica se a data de nascimento está em formato ISO
  nome: Joi.string().required(),
  likedLocations: Joi.array().items(Joi.number()).required(), // Validando um array de números
  likedCategories: Joi.array().items(Joi.number()).required(), // Validando um array de números
});
