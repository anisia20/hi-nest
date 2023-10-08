/* eslint-disable prettier/prettier */
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, Res } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entitiy';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(readonly movieService : MoviesService){}

  //express 위에 동작 req, res는 권장하지 않는다.
  //fastify 위에도 동작한다. 전환 지원도 많다.
  @Get()
  getAll() {
    return this.movieService.getAll();
  }
  
  @Get("search")
  search(@Query("year") searchYear: string){
    return `We are searching for a movie made after: ${searchYear}`;
  }

  @Get('/:id')
  getOne(@Param('id') movieId: number): Movie {
    return this.movieService.getOne(movieId);
  }

  @Post()
  create(@Body() movieData: CreateMovieDto) {
    return this.movieService.create(movieData);
  }

  @Delete('/:id')
  remove(@Param('id') movieId: number) {
    return this.movieService.deleteOne(movieId);
  }

  @Patch('/:id')
  patch(@Param('id') movieId: number, @Body() updateData: UpdateMovieDto) {
    return this.movieService.update(movieId, updateData);
  }

 
}
