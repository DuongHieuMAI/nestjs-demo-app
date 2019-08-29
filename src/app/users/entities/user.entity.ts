import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';
import { IsEmail } from 'class-validator';
import * as crypto from 'crypto';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  displayName: string;

  @Column('text')
  @IsEmail()
  email: string;

  @Column({ default: 'password' })
  password: string;

  // @BeforeInsert()
  // hashPassword() {
  //   this.password = crypto.createHmac('sha256', this.password).digest('hex');
  // }
}
