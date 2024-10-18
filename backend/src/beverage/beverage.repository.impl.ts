import { Injectable } from '@nestjs/common';
import { BeveragesRepository } from './beverage.repository';
import { Beverage } from 'entities/beverage';
import { PrismaService } from 'database/prisma.service';

@Injectable()
export class BeveragesRepositoryImpl implements BeveragesRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    createdAt: string,
    name: string,
    description: string,
    type: string,
    rating: number,
    userId: number,
  ): Promise<Beverage> {
    try {
      const newBeverage = await this.prisma.beverage.create({
        data: {
          createdAt,
          name,
          description,
          type,
          rating,
          userId,
        },
      });

      return newBeverage as unknown as Beverage;
    } catch {
      throw new Error('Não foi possível cadastrar a bebida');
    }
  }

  async findAllByUser(userId: number): Promise<Beverage[]> {
    try {
      const newBeverage = await this.prisma.beverage.findMany({
        where: {
          userId: userId,
        },
      });

      return newBeverage as unknown as Beverage[];
    } catch {
      throw new Error('Não foi possível encontrar as bebidas');
    }
  }
}
