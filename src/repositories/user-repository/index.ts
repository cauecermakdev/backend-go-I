import { prisma } from "@/config";
import { Prisma } from "@prisma/client";

async function findByEmail(email: string, select?: Prisma.UserSelect) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };

  if (select) {
    params.select = select;
  }

  return prisma.user.findUnique(params);
}

async function create(data: Prisma.UserUncheckedCreateInput) {
  return prisma.user.create({
    data
  });
}

async function insertlikedCategories(email: string, categories: number[], likedLocations: number[]) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return await prisma.user.update({
      where: { email: email },
      data: { likedCategories: { connect: categories.map(category => ({ id: category })) } },
    });
  } catch (error) {
    console.error('Erro ao inserir likedCategories:', error);
    throw error; // Lançar o erro novamente para que possa ser tratado onde a função é chamada
  }
}

async function insertlikedLocations(email: string, locations: number[]) {
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return await prisma.user.update({
      where: { email: email },
      data: { likedLocations: { connect: locations.map(local => ({ id: local })) } },
    });
  } catch (error) {
    console.error('Erro ao inserir likedLocations:', error);
    throw error; // Lançar o erro novamente para que possa ser tratado onde a função é chamada
  }
}

async function getAllUsersRepository() {
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.error('Erro ao buscar usuários dentro do repository back:', error);
    throw error;
  }
}

const userRepository = {
  findByEmail,
  create,
  insertlikedCategories,
  insertlikedLocations,
  getAllUsersRepository
};

export default userRepository;
