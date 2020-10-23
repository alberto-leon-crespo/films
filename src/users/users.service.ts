import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

  constructor(@InjectRepository(User) private usersRepository) {}

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    return await this.usersRepository.delete(id);
  }

  public async login(username, password) {
    const userInfo = await this
      .usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .andWhere("user.password = :password", { password: password })
      .getOne();
    if (!userInfo) {
      throw new HttpException(
        'User or password incorrect',
        HttpStatus.BAD_REQUEST
      );
    }
    return userInfo;
  }
}
