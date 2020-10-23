import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './film.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate';

@Injectable()
export class FilmsService {

  constructor(@InjectRepository(Film) private filmRespository) {}

  public findAll(): Promise<Film[]> {
    return this.filmRespository.find();
  }

  public findOne(id: string): Promise<Film> {
    return this.filmRespository.findOne(id);
  }

  public async remove(id: string): Promise<void> {
    return await this.filmRespository.delete(id);
  }

  public findBy(arrFilters): Promise<Film[]> {
    return this.filmRespository.find(arrFilters);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<FilmsService>> {
    return paginate<FilmsService>(this.filmRespository, options);
  }
}
