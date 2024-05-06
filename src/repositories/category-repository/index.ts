import { prisma } from '@/config';
import { EventCategory } from '@prisma/client';

async function upsert(
  name: string,
  createdCategory: CreateCategoryParams,
  updatedCategory: UpdateCategoryParams,
) {
  return prisma.eventCategory.upsert({
    where: {
      name: name
    },
    create: createdCategory,
    update: updatedCategory,
  });
}

async function getCategoriesRepository() {
  const categories = await prisma.eventCategory.findMany({});
  console.log(categories);
  return categories;
}

async function getUserCategoryRepository(userId: number) {
  return prisma.eventCategory.findMany({
    where: {
      id: userId,
    },
  });
}

// async function getUsersByCategoryRepository(category: string) {
//   return prisma.user.findMany({
//     where: {
//       likedCategories: {
//         some: {
//           name: category,
//         },
//       },
//     },
//     select: {
//       id: true,
//       nome: true,
//       email: true,
//       whatsapp: true,
//       dataNascimento: true,
//     },
//   });
// }

async function getUsersByCategoryRepository(category: string) {
  return prisma.user.findMany({
    where: {
      likedCategories: {
        some: {
          name: category,
        },
      },
    },
    select: {
      id: true,
      email: true,
      whatsapp: true,
      nome: true,
      dataNascimento: true,
      likedCategories: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
}

export type UpdateCategoryParams = CreateCategoryParams;
export type CreateCategoryParams = Omit<EventCategory, 'createdAt' | 'updatedAt'>;

const EventCategoryRepository = {
  upsert,
  getCategoriesRepository,
  getUserCategoryRepository,
  getUsersByCategoryRepository
};

export default EventCategoryRepository;
