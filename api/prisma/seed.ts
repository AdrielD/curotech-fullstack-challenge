import { Prisma, PrismaClient } from "@prisma/client";
const db = new PrismaClient();

async function main() {
  const user = await db.user.upsert({
    where: { email: 'ragnar@valhalla.com' },
    update: {},
    create: {
      email: 'ragnar@valhalla.com',
      password: 'admin12345',
      name: 'Ragnar Ragnarson',
      items: {
        create: [{
          name: 'Viking Axe',
          availableQty: 10,
          price: 10.0
        },
        {
          name: 'Wolf Pelt',
          availableQty: 5,
          price: 45.0
        },
        {
          name: 'Longboat',
          availableQty: 1,
          price: 500.0
        }]
      }
    }
  })
}

main()
  .then(async () => {
    await db.$disconnect()
  })
  .catch(async (e) => {
    console.log(e);
    await db.$disconnect()
    process.exit(1);
  })
