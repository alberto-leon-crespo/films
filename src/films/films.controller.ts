import { Controller, Get, Query, Req } from '@nestjs/common';
import { FilmsService } from './films.service';
import { query, Request } from 'express';

@Controller('films')
export class FilmsController {

  constructor(private filmsService: FilmsService) {}

  private isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  @Get()
  public getFilms(
    @Req() request: Request,
    @Query('_page') page: number,
    @Query('_limit') limit: number,
  ) {
    if (!page && !limit) {
      const find = {};
      for (const queryParam in request.query) {
        if (queryParam && !limit) {
          if (this.isNumeric(request.query[queryParam])) {
            find[queryParam] = Number(request.query[queryParam]);
          } else {
            find[queryParam] = request.query[queryParam];
          }
        }
      }
      return this.filmsService.findBy(find);
    } else {
      return this.filmsService.paginate({
        page,
        limit,
        route: 'http://localhost/films',
      });
    }
  }
}
