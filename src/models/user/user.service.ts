import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { CrudService } from 'src/common/crud.service';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginCredentialsDto } from './dto/login-credentials.dto';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {
    super(userRepository);
  }
  async findByEmail(email:string)
  {
    return await this.userRepository.findOneBy({email:email});
  }

  async register(userData: CreateUserDto) {
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
    if (!user) throw new NotFoundException('email or password incorrect ');
    const hashedPassword = await bcrypt.hash(password, user.salt);
    if (hashedPassword === user.password) {
      const payload = {
        email: user.email,
        name: user.name,
        role:user.role
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
    return { message: 'token authorizeation implemnted coorectly' };
  }
}
