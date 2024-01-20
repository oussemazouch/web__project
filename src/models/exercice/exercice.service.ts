import { Injectable } from '@nestjs/common';
import { CreateExerciceDto } from './dto/create-exercice.dto';
import { UpdateExerciceDto } from './dto/update-exercice.dto';
import { CrudService } from '../../common/crud.service';
import { Exercice } from './entities/exercice.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ExerciceService extends CrudService<Exercice> {
  constructor(
    @InjectRepository(Exercice)
    public exerciceRepository: Repository<Exercice>,
  ) {
    super(exerciceRepository);
  }
  async findExercice(id:number){
    return await this.exerciceRepository.findOne({where:{id}});
  }

}
