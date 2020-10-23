import { Controller, Get, Post, Query, Req, Res, Body, Delete, Param, HttpException, HttpStatus } from '@nestjs/common';
import { FilmsService } from './films.service';
import { Request, Response } from 'express';
import { FilmsValidationPipe } from './films-validation.pipe';
import { CreateFilmDto } from './create-film.dto';

@Controller()
export class FilmsController {

  constructor(private filmsService: FilmsService) {}

  private isNumeric(value) {
    return /^-?\d+$/.test(value);
  }

  @Get('/films')
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

  @Delete('/films/:id')
  public async deleteFilm(
    @Param('id') id: number,
    @Res() response: Response
  ) {
    const deleteResponse = await this.filmsService.remove(id as number);
    if (deleteResponse['affected'] !== 1) {
      throw new HttpException(
        `Error deleting user ${id}`,
        HttpStatus.BAD_REQUEST
      );
    }
    response.status(HttpStatus.NO_CONTENT).end();
  }

  @Post('/films')
  public async postFilms(
    @Body(new FilmsValidationPipe()) createFilmDto: CreateFilmDto
  ) {
    return await this.filmsService.create(createFilmDto);
  }
}
