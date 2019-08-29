import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  create(user: CreateUserDto) {
    this.userRepository.save(user);
    return user;
  }

  findAll(): Promise<UserEntity[]> {
      return this.userRepository.find();
  }

  findOneByEmail(usingEmail: string) {
    return this.userRepository.find({
      where: {email: usingEmail},
    });
  }

  findOneByEmailAndPassword(usingEmail: string, usingPassword: string) {
    const result = this.userRepository.find({
      where: {email: usingEmail, password: usingPassword},
      take: 1,
    });
    return result;
  }

}
