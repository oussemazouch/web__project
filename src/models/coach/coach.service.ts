import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { CrudService } from '../../common/crud.service';
import { Coach } from './entities/coach.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CoachService extends CrudService<Coach> {
  constructor(
    @InjectRepository(Coach)
    private CoachRepository: Repository<Coach>,
  ) {
    super(CoachRepository);
  }
}
