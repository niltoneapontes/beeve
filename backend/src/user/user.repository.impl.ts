import { Injectable } from '@nestjs/common';
import { UsersRepository } from './user.repository';
import { PrismaService } from 'database/prisma.service';
import { User } from 'entities/user';
import { UserDTO } from './user.dto';

@Injectable()
export class UsersRepositoryImpl implements UsersRepository {
  constructor(private prisma: PrismaService) {}
  async create({
    createdAt,
    email,
    name,
    username,
    birthdate,
    password,
    socialAccountId,
    socialAccountProvider,
  }: UserDTO): Promise<User> {
    try {
      const createdUser = await this.prisma.user.create({
        data: {
          createdAt,
          email,
          name,
          username,
          birthdate,
          password,
          socialAccountId,
          socialAccountProvider,
        },
      });

      return createdUser as unknown as User;
    } catch (error) {
      console.error('Repository Error: ', error);
      throw Error('Problema ao tentar cadastrar usuário');
    }
  }
  async edit({
    id,
    createdAt,
    email,
    name,
    username,
    birthdate,
    password,
    socialAccountId,
    socialAccountProvider,
  }: UserDTO): Promise<User> {
    try {
      const createdUser = await this.prisma.user.update({
        where: {
          id: id,
        },
        data: {
          createdAt,
          email,
          name,
          username,
          birthdate,
          password,
          socialAccountId,
          socialAccountProvider,
        },
      });

      return createdUser as unknown as User;
    } catch (error) {
      console.error('Repository Error: ', error);
      throw Error('Problema ao tentar editar usuário');
    }
  }
  async findUserByEmail(email: string): Promise<User> {
    try {
      const createdUser = await this.prisma.user.findFirst({
        where: {
          email: email,
        },
      });

      return createdUser as unknown as User;
    } catch (error) {
      console.error('Repository Error: ', error);
      throw Error(
        `Problema ao tentar encontrar usuário com o e-mail: ${email}`,
      );
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const deletedUser = await this.prisma.user.delete({
        where: {
          id: id,
        },
      });
      return deletedUser as unknown as User;
    } catch (error) {
      console.error('Repository Error: ', error);
      throw Error('Problema ao deletar o usuário');
    }
  }
}
