import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function usersPost(req: Request, res: Response) {
  const { email, password, whatsapp, dataNascimento, nome } = req.body;

  try {
    const user = await userService.createUser({ email, password, whatsapp, dataNascimento, nome });

    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
      password: user.password,
      whatsapp: user.whatsapp,
      dataNascimento: user.dataNascimento,
      nome: user.nome
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    console.log("aqui");
    console.log(error.message);
    return res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
}
