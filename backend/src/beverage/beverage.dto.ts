import { IsNotEmpty } from 'class-validator';

export class BeverageDTO {
  @IsNotEmpty({
    message: 'Nome eh obrigatorio',
  })
  name: string;
  @IsNotEmpty({
    message: 'Momento de criacao eh obrigatorio',
  })
  createdAt: string;
  id: number;
  description: string;
  type: string;
  rating: number;
  userId: number;
  image?: string;
}

export class BeverageQueryDTO {
  @IsNotEmpty({
    message: 'Por favor informe o id do usuario',
  })
  userId: string;
}

export class BeverageDeleteQueryDTO {
  @IsNotEmpty({
    message: 'Por favor informe o id da bebida',
  })
  id: string;
}
