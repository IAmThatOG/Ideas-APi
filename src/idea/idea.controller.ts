import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { IdeaRequestDto } from './dto/idea-request.dto';
import { HttpErrorFilter } from '../shared/http-error-filter';
import { LoggingInterceptor } from '../shared/logging.interceptor';
import { ValidationPipe } from '../pipes/validation.pipe';
import { CreateIdeaDto } from './dto/create-idea.dto';

@Controller('ideas')
export class IdeaController {
  constructor(private ideaService: IdeaService) {}

  @Post()
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(HttpErrorFilter)
  @UsePipes(ValidationPipe)
  async createIdea(@Body() request: CreateIdeaDto) {
    return await this.ideaService.createIdea(request);
  }

  @Get()
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(new HttpErrorFilter())
  async getAllIdeas() {
    return await this.ideaService.getAllIdeas();
  }

  @Get(':id')
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(new HttpErrorFilter())
  async getIdeaById(@Param('id') id: string) {
    return await this.ideaService.getIdeaById(id);
  }

  @Put(':id')
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(new HttpErrorFilter())
  async editIdea(@Param('id') id: string, @Body() requestBody: IdeaRequestDto) {
    return await this.ideaService.updateIdea(requestBody, id);
  }

  @Delete(':id')
  @UseInterceptors(LoggingInterceptor)
  @UseFilters(new HttpErrorFilter())
  async deleteIdea(@Param('id') id: string) {
    return await this.ideaService.deleteIdea(id);
  }
}
