import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CrudService } from 'src/common/crud.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private coursRepository: Repository<User>,
  ) {
    super(coursRepository);
  }
}
