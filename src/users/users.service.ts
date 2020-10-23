import { HttpCode, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './create-user.dto';
import { SaltPasswordUtils } from '../utils/salt-password.utils';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {

  private saltPasswordUtils: SaltPasswordUtils;

  constructor(
    @InjectRepository(User) private usersRepository,
    private configService: ConfigService
  ) {
    this.saltPasswordUtils = new SaltPasswordUtils();
  }

  public findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  public findOne(id: string): Promise<User> {
    return this.usersRepository.findOne(id);
  }

  public async create(user: CreateUserDto) {
    const salt = this.configService.get('app.encryptation_key');
    const saltedPassword = this.saltPasswordUtils.hashPassword(
      user.password,
      salt
    );
    user.password = saltedPassword.hashedPassword;
    const userData = await this.usersRepository.save(user);
    delete userData.password;
    return userData;
  }

  public async login(username, password): Promise<User> {
    const salt = this.configService.get('app.encryptation_key');
    const saltedPassword = this.saltPasswordUtils.hashPassword(password, salt);
    const userInfo = await this
      .usersRepository
      .createQueryBuilder("user")
      .where("user.username = :username", { username: username })
      .andWhere("user.password = :password", {
        password: saltedPassword.hashedPassword
      })
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
