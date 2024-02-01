import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CrudService } from 'src/common/crud.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { Role } from 'src/common/role.enum';
import { CoachService } from '../coach/coach.service';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
    private coachService: CoachService
  ) {
    super(userRepository);
  }
  async findByEmail(email: string) {
    return await this.userRepository.findOneBy({ email: email });
  }

  async register(userData: CreateUserDto) {
    userData.role=Role.USER;
    const user = this.userRepository.create({
      ...userData,
    });
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
    try {
      await this.create(user);
    } catch (e) {
      throw new ConflictException('Email address should be unique');
    }
    return {
      id: user.id,
      name: user.name,
      lastname: user.lastName,
      email: user.email,
      password: user.password,
    };
  }
  async login(credentials: LoginCredentialsDto) {
    const { email, password } = credentials;
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.email= :email', { email })
      .getOne();
      
    if (!user)
    {
      const coach = await this.coachService.findByEmail(email);
      console.log(coach);
      
      if(!coach)
      throw new NotFoundException('Email or Password incorrect. Please Try again.');
    else {
      const hashedPassword = await bcrypt.hash(password, coach.salt);
    if (hashedPassword === coach.password) {
      const payload = {
        email: coach.email,
        name: coach.name,
        role: coach.role,
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
  token_authorization_testing() {
    return { message: 'token authorization implemented correctly' };
  }
  createUser(user: CreateUserDto): Promise<User> {
    user.role=Role.ADMIN;
    return this.create(user);
  }
}
