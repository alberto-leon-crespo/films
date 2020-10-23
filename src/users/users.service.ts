import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository) {

  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    return await this.usersRepository.delete(id);
  }

  public async login(username, password): Promise<boolean> {
    return false;
  }
}
