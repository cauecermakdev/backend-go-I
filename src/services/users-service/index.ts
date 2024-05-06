// import { userRepository } from '@/repositories/user-repository';
// import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";
import { UserComplete } from "@/protocols";

export async function getAllUsersService(): Promise<User[]> {
  const users = await userRepository.getAllUsersRepository();
  return users;
}

export async function createUser({ email, password, whatsapp, dataNascimento, nome, likedCategories, likedLocations }: UserComplete): Promise<User> {
  const dataNascimento_date = new Date(dataNascimento); // formato ISO 8601

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);

  // Crie o usuário
  const user = await userRepository.create({
    email,
    password: hashedPassword,
    whatsapp,
    nome,
    dataNascimento: dataNascimento_date
  });

  if (!user) {
    throw new Error(`Failed to create user with email ${email}`);
  }

  // Insira as categorias e localizações favoritas do usuário
  await userRepository.insertlikedCategories(email, likedCategories, likedLocations);
  await userRepository.insertlikedLocations(email, likedLocations);

  return user;
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, "email" | "password" | "whatsapp" | "dataNascimento" | "nome">&
{
  likedLocations: number[];
  likedCategories: number[];
};

const userService = {
  createUser,
  getAllUsersService
};

export * from "./errors";
export default userService;
