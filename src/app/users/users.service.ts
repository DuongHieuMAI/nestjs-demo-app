import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { User } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  // create(user: User) {
  //     this.users.push(user);
  //     return user;
  // }

  create(user: UserEntity) {
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
}
