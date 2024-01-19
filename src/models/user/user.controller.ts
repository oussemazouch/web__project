import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/common/docrators/roles.decorator';
import { Role } from 'src/common/role.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN,Role.USER)
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN,Role.USER)
  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }

  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ADMIN)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  // @Get('TestingToken')
  // @UseGuards(JwtAuthGuard)
  // test() {
  //   return this.userService.token_authorization_testing();
  // }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  // @UseGuards(RolesGuard)
  // @Roles(Role.ADMIN)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
