import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Page } from 'src/common/dtos/page.dto';

@Controller('coach')
export class CoachController {
  constructor(private readonly coachService: CoachService) {}


  @Get('list')
  async getProductsByPage(@Query() pageData: Page): Promise<Pagination<Coach>>
  {
    return this.coachService.paginate({
      page:pageData.page,
      limit:pageData.limit,

    });
  }
  @Post()
  async create(@Body() createCoachDto: CreateCoachDto) {
    return await this.coachService.create(createCoachDto);
  }

  @Get()
  findAll(): Promise<Coach[]> {
    return this.coachService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coachService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
    return this.coachService.update(+id, updateCoachDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coachService.remove(+id);
  }
}
