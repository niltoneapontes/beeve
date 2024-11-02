import { Injectable } from '@nestjs/common';
import { User } from 'entities/user';
import { UsersRepository } from './user.repository';
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(private repository: UsersRepository) {}
  async createUser({
    birthdate,
    createdAt,
    email,
    name,
    password,
    socialAccountId,
    socialAccountProvider,
    username,
  }: UserDTO): Promise<User> {
    try {
      const foundUserByEmail = await this.repository.findUserByEmail(email);

      if (foundUserByEmail) {
        throw Error('E-mail já cadastrado');
      }

      const createdUser = await this.repository.create(
        birthdate,
        createdAt,
        email,
        name,
        password,
        socialAccountId,
        socialAccountProvider,
        username,
      );

      return createdUser;
    } catch (error) {
      throw Error(`Erro na criação do usuário: ${error}`);
    }
  }

  async editUser({
    id,
    birthdate,
    createdAt,
    email,
    name,
    password,
    socialAccountId,
    socialAccountProvider,
    username,
  }: UserDTO): Promise<User> {
    try {
      const edittedUser = await this.repository.edit(
        id,
        birthdate,
        createdAt,
        email,
        name,
        password,
        socialAccountId,
        socialAccountProvider,
        username,
      );

      return edittedUser;
    } catch (error) {
      throw Error(`Erro na edição do usuário: ${error}`);
    }
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await this.repository.delete(id);
      return deletedUser;
    } catch (error) {
      throw Error(`Erro na edição do usuário: ${error}`);
    }
  }
}
