import { IsNotEmpty } from 'class-validator';

export class ApplicationDto {
  readonly id: number;

  @IsNotEmpty()
  readonly dateReceived: string;

  @IsNotEmpty()
  readonly clientCompany: string;

  @IsNotEmpty()
  readonly carrierName: string;

  @IsNotEmpty()
  readonly carrierPhoneNumber: string;

  @IsNotEmpty()
  readonly comments: string;

  @IsNotEmpty()
  readonly status: 'Новая' | 'В работе' | 'Завершено';

  @IsNotEmpty()
  readonly atiCode: string;
}
