import { Injectable } from '@nestjs/common';
import { User } from 'entities/user';
import { UsersRepository } from './user.repository';
import { UserDTO } from './user.dto';
import { comparePassword, hashPassword } from 'utils/bcrypt';

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

      const createdUser = await this.repository.create({
        birthdate,
        createdAt,
        email,
        name,
        password: await hashPassword(password),
        socialAccountId,
        socialAccountProvider,
        username,
      });

      return createdUser;
    } catch (error) {
      throw Error(error);
    }
  }

  async login({
    email,
    password,
  }: Pick<UserDTO, 'email' | 'password'>): Promise<User> {
    try {
      const foundUserByEmail = await this.repository.findUserByEmail(email);

      if (!foundUserByEmail) {
        throw Error('E-mail não cadastrado');
      }

      if (!comparePassword(password, foundUserByEmail.password)) {
        throw Error('E-mail ou senha incorretos');
      }

      return foundUserByEmail;
    } catch (error) {
      throw Error(error);
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
      const edittedUser = await this.repository.edit({
        id,
        birthdate,
        createdAt,
        email,
        name,
        password: await hashPassword(password),
        socialAccountId,
        socialAccountProvider,
        username,
      });

      return edittedUser;
    } catch (error) {
      throw Error(error);
    }
  }

  async deleteUser(id: number) {
    try {
      const deletedUser = await this.repository.delete(id);
      return deletedUser;
    } catch (error) {
      throw Error(error);
    }
  }
}
