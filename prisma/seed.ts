import dayjs from 'dayjs';
import faker from '@faker-js/faker';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpar todos os dados antigos
  await prisma.session.deleteMany({}); // Exclua as sessões primeiro
  await prisma.event.deleteMany({});
  await prisma.eventLocation.deleteMany({});
  await prisma.eventCategory.deleteMany({});
  await prisma.user.deleteMany({});

  // Função para criar usuários com sessões e associar categorias e locais
  async function createUsersWithSessionsAndPreferences() {
    for (let i = 0; i < 30; i++) { // Criar 30 usuários
      const email = faker.internet.email();
      const password = await bcrypt.hash(faker.internet.password(), 10);

      // Criação do usuário
      const user = await prisma.user.create({
        data: {
          email,
          password,
          nome: faker.name.firstName(), // Adicionando nome
          dataNascimento: faker.date.past(), // Adicionando data de nascimento
          whatsapp: faker.phone.phoneNumberFormat(2), // Adicionando número de WhatsApp
        },
      });

      // Criação da sessão para o usuário
      const session = await prisma.session.create({
        data: {
          userId: user.id,
          token: faker.random.alphaNumeric(32),
        },
      });

      // Seleciona categorias aleatórias para o usuário
      const categories = await prisma.eventCategory.findMany();
      const selectedCategories = faker.random.arrayElements(categories, 3);
      await prisma.user.update({
        where: { id: user.id },
        data: { likedCategories: { connect: selectedCategories.map(category => ({ id: category.id })) } },
      });

      // Seleciona locais aleatórios para o usuário
      const locations = await prisma.eventLocation.findMany();
      const selectedLocations = faker.random.arrayElements(locations, 2);
      await prisma.user.update({
        where: { id: user.id },
        data: { likedLocations: { connect: selectedLocations.map(location => ({ id: location.id })) } },
      });
    }
  }

  // Função para criar categorias de eventos
  async function createEventCategories() {
    const categories = ['Cervejada', 'Funk', 'Rock', 'Samba', 'Trap']; // Apenas 5 categorias

    for (let i = 0; i < categories.length; i++) {
      await prisma.eventCategory.create({
        data: {
          id: i + 1,
          name: categories[i],
        },
      });
    }
  }

  // Função para criar locais de eventos
  async function createEventLocations() {
    const locations = [
      { name: 'Convention Center', address: '123 Main St', phone: '555-1234' },
      { name: 'Stadium', address: '456 Elm St', phone: '555-5678' },
      { name: 'Art Gallery', address: '789 Oak St', phone: '555-9012' },
      { name: 'Restaurant', address: '321 Pine St', phone: '555-3456' },
      { name: 'Park', address: '567 Maple St', phone: '555-7890' }, // Adicionando mais um local
    ];
    for (const location of locations) {
      await prisma.eventLocation.create({
        data: {
          ...location,
        },
      });
    }
  }

  // Função para criar eventos
  async function createEvents() {
    const categories = await prisma.eventCategory.findMany();
    const locations = await prisma.eventLocation.findMany();
    for (let i = 0; i < 10; i++) {
      const title = faker.lorem.words(2);
      const startsAt = dayjs().add(faker.datatype.number({ min: 1, max: 30 }), 'day').toDate();
      const endsAt = dayjs(startsAt).add(faker.datatype.number({ min: 1, max: 7 }), 'day').toDate();
      const category = faker.random.arrayElement(categories);
      const location = faker.random.arrayElement(locations);
      await prisma.event.create({
        data: {
          title,
          startsAt,
          endsAt,
          backgroundImageUrl: faker.image.imageUrl(),
          logoImageUrl: faker.image.imageUrl(),
          categories: { connect: { id: category.id } },
          location: { connect: { id: location.id } },
        },
      });
    }
  }

  // Executa as funções para criar categorias, locais, eventos, usuários e sessões
  await createEventCategories();
  await createEventLocations();
  await createEvents();
  await createUsersWithSessionsAndPreferences();

  console.log("Seed concluído com sucesso.");
}

main()
  .catch((e) => {
    console.error("Erro durante a execução do seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
