import { IsNotEmpty } from 'class-validator';

export class UserDTO {
  @IsNotEmpty({
    message: 'E-mail eh obrigatorio',
  })
  email: string;
  @IsNotEmpty({
    message: 'Momento de criacao eh obrigatorio',
  })
  id: number;
  createdAt: string;
  name: string;
  username: string;
  birthdate: string;
  password: string;
  socialAccountId: string;
  socialAccountProvider: string;
}

export class UserDeleteQueryDTO {
  @IsNotEmpty({
    message: 'Por favor informe o id do usuario',
  })
  id: string;
}
