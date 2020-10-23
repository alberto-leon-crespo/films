import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './film.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions
} from 'nestjs-typeorm-paginate';
import { CreateFilmDto } from './create-film.dto';

@Injectable()
export class FilmsService {

  constructor(@InjectRepository(Film) private filmRespository) {}

  public findAll(): Promise<Film[]> {
    return this.filmRespository.find();
  }

  public async remove(id: number): Promise<void> {
    return await this.filmRespository.delete(id);
  }

  public async create(film: CreateFilmDto) {
    return await this.filmRespository.save(film);
  }

  public findBy(arrFilters): Promise<Film[]> {
    return this.filmRespository.find(arrFilters);
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<FilmsService>> {
    return paginate<FilmsService>(this.filmRespository, options);
  }
}
