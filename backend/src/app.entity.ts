import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  clientCompany: string;
  @Column()
  dateReceived: string;
  @Column()
  carrierName: string;
  @Column()
  carrierPhoneNumber: string;
  @Column()
  comments: string;
  @Column()
  status: 'Новая' | 'В работе' | 'Завершено';
  @Column()
  atiCode: string;
}
