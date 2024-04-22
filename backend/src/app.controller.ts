import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import { AppService } from './app.service';
import { ApplicationDto } from './dto/application.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getAllApplications(): Promise<ApplicationDto[]> {
    return this.appService.findAll();
  }

  @Post()
  async create(
    @Body() createApplicationDto: ApplicationDto,
  ): Promise<ApplicationDto> {
    return this.appService.create(createApplicationDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateApplicationDto: ApplicationDto,
  ): Promise<ApplicationDto> {
    return this.appService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.appService.delete(id);
  }
}
