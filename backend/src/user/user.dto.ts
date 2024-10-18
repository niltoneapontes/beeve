import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({
    message: 'E-mail eh obrigatorio',
  })
  email: string;
  @IsNotEmpty({
    message: 'Momento de criacao eh obrigatorio',
  })
  createdAt: string;
  name: string;
  username: string;
  birthdate: string;
  password: string;
  socialAccountId: string;
  socialAccountProvider: string;
}

export class UserQueryDTO {
  @IsNotEmpty({
    message: 'Por favor informe o e-mail do usuario',
  })
  email: string;
}
