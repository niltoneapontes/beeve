import { Injectable } from '@nestjs/common';
import { BeveragesRepository } from './beverage.repository';
import { BeverageDTO } from './beverage.dto';
import { Beverage } from 'entities/beverage';

@Injectable()
export class BeverageService {
  constructor(private repository: BeveragesRepository) {}
  async createBeverage({
    createdAt,
    description,
    name,
    rating,
    type,
    userId,
  }: BeverageDTO): Promise<Beverage> {
    try {
      const createdBeverage = await this.repository.create(
        createdAt,
        name,
        description,
        type,
        rating,
        userId,
      );

      return createdBeverage;
    } catch (error) {
      throw new Error(error);
    }
  }

  async editBeverage({
    id,
    createdAt,
    description,
    name,
    rating,
    type,
    userId,
  }: BeverageDTO): Promise<Beverage> {
    try {
      const edittedBeverage = await this.repository.edit(
        id,
        createdAt,
        name,
        description,
        type,
        rating,
        userId,
      );

      return edittedBeverage;
    } catch (error) {
      throw new Error(error);
    }
  }

  async findBeveragesByUser(userId: number): Promise<Beverage[]> {
    try {
      const list = await this.repository.findAllByUser(userId);
      return list;
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteBeverage(id: number) {
    try {
      const deletedBeverage = await this.repository.delete(id);
      return deletedBeverage;
    } catch (error) {
      throw new Error(error);
    }
  }
}
