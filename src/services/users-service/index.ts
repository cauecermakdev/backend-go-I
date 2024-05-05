// import { cannotEnrollBeforeStartDateError } from "@/errors";
import userRepository from "@/repositories/user-repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { duplicatedEmailError } from "./errors";

export async function createUser({ email, password, whatsapp, dataNascimento, nome }: CreateUserParams): Promise<User> {
  // await canEnrollOrFail();

  const dataNascimento_date = new Date(dataNascimento); //formato ISO 8601

  await validateUniqueEmailOrFail(email);

  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
    whatsapp,
    nome, 
    dataNascimento: dataNascimento_date,
  });
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

export type CreateUserParams = Pick<User, "email" | "password" | "whatsapp" | "dataNascimento" | "nome">;

const userService = {
  createUser,
};

export * from "./errors";
export default userService;
