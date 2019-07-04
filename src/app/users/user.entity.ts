import { Column, Entity, PrimaryGeneratedColumn, Table } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column('text') displayName: string;

  @Column('text') email: string;
}