import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Application } from './app.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db/database.sqlite',
      entities: [Application],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Application]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
