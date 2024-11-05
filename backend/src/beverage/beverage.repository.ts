import { Beverage } from 'entities/beverage';

export abstract class BeveragesRepository {
  abstract create(
    createdAt: string,
    name: string,
    description: string,
    type: string,
    rating: number,
    userId: number,
    image: string,
  ): Promise<Beverage>;

  abstract edit(
    id: number,
    createdAt: string,
    name: string,
    description: string,
    type: string,
    rating: number,
    userId: number,
    image: string,
  ): Promise<Beverage>;

  abstract findAllByUser(userId: number): Promise<Beverage[]>;

  abstract delete(id: number): Promise<Beverage>;
}
