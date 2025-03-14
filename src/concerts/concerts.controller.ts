import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Controller('concerts')
export class ConcertsController {
  constructor(private readonly concertsService: ConcertsService) {}

  @Get()
  async getAllConcerts() {
    return this.concertsService.findAll();
  }

  @Post()
  async createConcert(@Body() dto: CreateConcertDto) {
    return this.concertsService.create(dto);
  }

  @Patch(':id')
  async updateConcert(@Param('id') id: string, @Body() dto: UpdateConcertDto) {
    return this.concertsService.update(Number(id), dto);
  }

  @Delete(':id')
  async deleteConcert(@Param('id') id: string) {
    return this.concertsService.delete(Number(id));
  }
}
