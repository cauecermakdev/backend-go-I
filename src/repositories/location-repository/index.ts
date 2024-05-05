import { prisma } from '@/config';
import { EventCategory } from '@prisma/client';

// async function getUsersByLocationRepository(location: string) {
//   return prisma.user.findMany({
//     where: {
//       likedLocations: {
//         some: {
//           name: location,
//         },
//       },
//     },
//     select: {
//       id: true,
//       email: true,
//       whatsapp: true,
//       nome: true,
//     },
//   });
// }

async function getUsersByLocationRepository(location: string) {
  return prisma.user.findMany({
    where: {
      likedLocations: {
        some: {
          name: location,
        },
      },
    },
    select: {
      id: true,
      email: true,
      whatsapp: true,
      nome: true,
      likedLocations: {
        select: {
          id: true,
          name: true,
          address: true,
          phone: true,
        },
      },
    },
  });
}

const locationRepository = {
  getUsersByLocationRepository
};

export default locationRepository;
