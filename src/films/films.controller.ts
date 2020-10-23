import { Controller, Get, Query } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {

  constructor(private filmsService: FilmsService) {}

  @Get()
  public getFilms(
    @Query('_page') page: number = 1,
    @Query('_limit') limit: number = 15
  ) {
    return this.filmsService.paginate({
      page,
      limit,
      route: 'http://localhost/films',
    });
  }
}
