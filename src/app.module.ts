import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {
    
  }
}
