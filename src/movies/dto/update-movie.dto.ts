import { PartialType } from "@nestjs/mapped-types"; //model mapper 역활
import { CreateMovieDto } from "./create-movie.dto"; 

export class UpdateMovieDto extends PartialType(CreateMovieDto){}