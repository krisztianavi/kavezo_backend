import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateConcertDto } from './dto/create-concert.dto';
import { UpdateConcertDto } from './dto/update-concert.dto';

@Injectable()
export class ConcertsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll() {
    return this.prisma.concert.findMany();
  }

  async create(dto: CreateConcertDto) {
    return this.prisma.concert.create({ data: dto });
  }

  async update(id: number, dto: UpdateConcertDto) {
    return this.prisma.concert.update({ where: { id }, data: dto });
  }

  async delete(id: number) {
    return this.prisma.concert.delete({ where: { id } });
  }
}
