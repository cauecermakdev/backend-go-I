import { UserComplete } from '@/protocols';
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const { email, password, whatsapp, dataNascimento, nome, likedCategories, likedLocations } = req.body;
  try {
    const user = await userService.createUser({ email, password, whatsapp, dataNascimento, nome, likedCategories, likedLocations });
    console.log("entra");
    console.log(user);
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      password: user.password,
      whatsapp: user.whatsapp,
      dataNascimento: user.dataNascimento,
      nome: user.nome,
      likedCategories: likedCategories,
      likedLocations: likedLocations,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    console.log(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}

export async function getAllUsers(req: Request, res: Response) {
  try {
    const allUsers = await userService.getAllUsersService();
    return res.status(httpStatus.OK).json(allUsers); // Envia os usuários como resposta JSON
  } catch (error) {
    console.error('Erro ao buscar todos os usuários:', error);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send('Erro ao buscar usuários');
  }
}