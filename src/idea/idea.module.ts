import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Idea } from './models/idea.model';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';

@Module({
  imports: [TypeOrmModule.forFeature([Idea])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
