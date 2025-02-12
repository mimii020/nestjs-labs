/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Param, Delete, Put, Req } from '@nestjs/common';
import { CvService } from './cv.service';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
import { Cv } from './entities/cv.entity';

@Controller('cv')
export class CvController {
  constructor(private readonly cvService: CvService) {}

  @Get()
  findAll() {
    return this.cvService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cvService.findOne(id);
  }


  @Post()
  createCv(@Body() createCvDto: CreateCvDto, @Req() req): Promise<Cv> {
    const userId = req.user.userId;
    return this.cvService.create(createCvDto, userId);
  }

  @Put(':id')
  updateCv(@Param('id') id: string, @Body() updateCvDto: UpdateCvDto): Promise<Cv> {
    return this.cvService.update(id, updateCvDto);
  }

  @Delete(':id')
  deleteCv(@Param('id') id: string): Promise<void> {
    return this.cvService.remove(id);
  }
}