import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApplicationDto } from './dto/application.dto';
import { Application } from './app.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Application)
    private readonly repository: Repository<ApplicationDto>,
  ) {}

  async findAll(): Promise<ApplicationDto[]> {
    return this.repository.find();
  }

  async create(application: ApplicationDto) {
    return this.repository.save(application);
  }

  async update(id: number, application: ApplicationDto) {
    await this.repository.update(id, application);
    return this.repository.findOne({ where: { id } });
  }

  async delete(id: number) {
    return this.repository.delete(id);
  }
}
