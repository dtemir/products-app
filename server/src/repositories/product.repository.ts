import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export interface Product {
  name: string;
}

export class ProductRepository {
  async findAll() {
    return prisma.product.findMany();
  }

  async create(data: Product) {
    return prisma.product.create({
      data,
    });
  }
}
