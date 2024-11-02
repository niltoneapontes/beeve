import { User } from 'entities/user';

export abstract class UsersRepository {
  abstract create(
    createdAt: string,
    email: string,
    name: string,
    username: string,
    birthdate: string,
    password: string,
    socialAccountId: string,
    socialAccountProvider: string,
  ): Promise<User>;

  abstract edit(
    id: number,
    createdAt: string,
    email: string,
    name: string,
    username: string,
    birthdate: string,
    password: string,
    socialAccountId: string,
    socialAccountProvider: string,
  ): Promise<User>;

  abstract findUserByEmail(email: string): Promise<User>;
  abstract delete(id: number): Promise<User>;
}
