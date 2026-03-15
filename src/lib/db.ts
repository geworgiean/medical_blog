import { PrismaClient } from "@prisma/client";

export const db = new PrismaClient({
  datasources: {
    db: {
      url: "postgres://454ab1bb2f6c0d0f18def4e710322e46c4075c327d7c8478d62a2b4044e0b985:sk__NOW9kJF4buvSBQKoYurI@db.prisma.io:5432/postgres?sslmode=require",
    },
  },
});