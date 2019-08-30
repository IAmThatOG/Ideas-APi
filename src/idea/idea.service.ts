import {
  Injectable,
  NotImplementedException,
  Logger,
  InternalServerErrorException,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Idea } from './models/idea.model';
import { InjectRepository } from '@nestjs/typeorm';
import { IdeaRequestDto } from './dto/idea-request.dto';
import { IdeaResponseDto } from './dto/idea-response.dto';
import { BaseResponseDto } from 'src/idea/models/base-response.dto';

@Injectable()
export class IdeaService {
  constructor(
    @InjectRepository(Idea) private ideaRepository: Repository<Idea>,
  ) {}

  async getAllIdeas(): Promise<BaseResponseDto> {
    let ideaDtos: IdeaResponseDto[] = [];
    const ideas = await this.ideaRepository.find();
    ideas.forEach(idea => {
      let ideaDto = new IdeaResponseDto(
        idea.id,
        idea.idea,
        idea.description,
        idea.dateCreated,
        idea.dateUpdated,
      );
      ideaDtos.push(ideaDto);
    });
    return new BaseResponseDto('00', 'success', ideaDtos);
  }

  async getIdeaById(id: string): Promise<BaseResponseDto> {
    let ideaDto: IdeaResponseDto = null;
    const idea = await this.ideaRepository.findOne(id);
    if (!idea) throw new NotFoundException(`idea with id ${id} doesn't exist`);
    ideaDto = new IdeaResponseDto(
      idea.id,
      idea.idea,
      idea.description,
      idea.dateCreated,
      idea.dateUpdated,
    );
    return new BaseResponseDto('00', 'success', ideaDto);
  }

  async createIdea(data: IdeaRequestDto): Promise<BaseResponseDto> {
    const newIdea = new Idea();
    newIdea.idea = data.idea;
    newIdea.description = data.description;
    const result = await this.ideaRepository.save(newIdea);
    if (result == null)
      throw new HttpException(
        'failed to create idea. Please use the right payload',
        HttpStatus.BAD_REQUEST,
      );
    const ideaResponseDto = new IdeaResponseDto(
      result.id,
      result.idea,
      result.description,
      result.dateCreated,
      result.dateUpdated,
    );

    return new BaseResponseDto('00', 'success', ideaResponseDto);
  }

  async updateIdea(data: Partial<IdeaRequestDto>, id: string): Promise<any> {
    let idea = await this.ideaRepository.findOne(id);
    if (!idea)
      throw new HttpException(
        `idea with id ${id} doesn't exist`,
        HttpStatus.NOT_FOUND,
      );
    let result = await this.ideaRepository.update({ id }, data);
    if (!result)
      throw new HttpException('Failed to update idea', HttpStatus.NOT_MODIFIED);
    Logger.debug(result);
  }

  async deleteIdea(id: string): Promise<any> {
    let result = null;
    try {
      const idea = await this.ideaRepository.findOne(id);
      if (!idea)
        throw new NotFoundException(`idea with id ${id} doesn't exist`);
      result = await this.ideaRepository.remove(idea);
    } catch (error) {
      Logger.error(error);
    }
    Logger.debug(result);
    return result;
  }
}
