import { User } from 'entities/user';
import { UserDTO } from './user.dto';

export abstract class UsersRepository {
  abstract create({
    createdAt,
    email,
    name,
    username,
    birthdate,
    password,
    socialAccountId,
    socialAccountProvider,
  }: Omit<UserDTO, 'id'>): Promise<User>;

  abstract edit({
    createdAt,
    email,
    name,
    username,
    birthdate,
    password,
    socialAccountId,
    socialAccountProvider,
  }: UserDTO): Promise<User>;

  abstract findUserByEmail(email: string): Promise<User>;
  abstract delete(id: number): Promise<User>;
}
