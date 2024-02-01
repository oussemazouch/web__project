import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { CrudService } from '../../common/crud.service';
import { Coach } from './entities/coach.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/common/role.enum';
import * as bcrypt from 'bcrypt';
import { LoginCredentialsDto } from '../user/dto/login-credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoachService extends CrudService<Coach> {
  
  constructor(
    @InjectRepository(Coach)
    private CoachRepository: Repository<Coach>,
    private jwtService: JwtService,
  ) {
    super(CoachRepository);
  }
  async findByEmail(email: string) {
    return await this.CoachRepository.findOneBy({ email: email });
  }
  createCoach(coach: CreateCoachDto): Promise<Coach> {
    coach.role=Role.COACH;
    return this.create(coach);
  }
  async register(coachData: CreateCoachDto) {
    coachData.role=Role.COACH;
    const coach = this.CoachRepository.create({
      ...coachData,
    });
    coach.salt = await bcrypt.genSalt();
    coach.password = await bcrypt.hash(coach.password, coach.salt);
    try {
      await this.create(coach);
    } catch (e) {
      throw new ConflictException('Email address should be unique');
    }
    return {
      id: coach.id,
      name: coach.name,
      lastname: coach.lastName,
      email: coach.email,
      password: coach.password,
    };
  }
  async login(credentials: LoginCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.CoachRepository
      .createQueryBuilder('user')
      .where('user.email= :email', { email })
      .getOne();
    if (!user) throw new NotFoundException('Email or Password incorrect. Please Try again.');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        email: user.email,
        name: user.name,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);
      return {
        access_token: token,
        message: 'successfully logged !',
      };
    } else {
      throw new NotFoundException('email or password incorrect ');
    }
  }
}
