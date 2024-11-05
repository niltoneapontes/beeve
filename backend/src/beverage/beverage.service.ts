import { Injectable } from '@nestjs/common';
import { BeveragesRepository } from './beverage.repository';
import { BeverageDTO } from './beverage.dto';
import { Beverage } from 'entities/beverage';
import { ConfigService } from '@nestjs/config';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

@Injectable()
export class BeverageService {
  private readonly s3Client = new S3Client({
    region: this.configServices.getOrThrow('AWS_S3_REGION'),
  });

  constructor(
    private repository: BeveragesRepository,
    private readonly configServices: ConfigService,
  ) {}

  async createBeverage({
    createdAt,
    description,
    name,
    rating,
    type,
    userId,
    image,
  }: BeverageDTO): Promise<Beverage> {
    try {
      console.log(image);
      const createdBeverage = await this.repository.create(
        createdAt,
        name,
        description,
        type,
        rating,
        userId,
        image,
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
    image,
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
        image,
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

  async uploadImage(filename: string, file: Buffer) {
    try {
      return await this.s3Client.send(
        new PutObjectCommand({
          Bucket: 'beeve-beverages',
          Key: filename,
          Body: file,
        }),
      );
    } catch (error) {
      throw Error('Não foi possível enviar a imagem');
    }
  }
}
