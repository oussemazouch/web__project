import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
  Request,
  UseGuards,
  UnauthorizedException,
  Res
} from '@nestjs/common';
import { CoachService } from './coach.service';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { Coach } from './entities/coach.entity';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Page } from 'src/common/dtos/page.dto';
import { LoginCredentialsDto } from '../user/dto/login-credentials.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { storage } from '../user/user.controller';
import { join } from 'path';
import { verify } from "jsonwebtoken";
import { JwtAuthGuard } from '../user/Guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/common/docrators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { Observable, from, map,of,tap } from 'rxjs';
import { User } from '@ngneat/falso';

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
  @Post('register')
  register(@Body() createUserDto: CreateCoachDto) {
    return this.coachService.register(createUserDto);
  }
  
  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.coachService.login(credentials);
  }
  @Post()
  async create(@Body() createCoachDto: CreateCoachDto) {
    return await this.coachService.createCoach(createCoachDto);
  }
  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ADMIN,Role.COACH)
 @Get('email/:email')
  findByEmail(@Param('email') email: string) {
    console.log(email);
    
    return this.coachService.findByEmail(email);
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
  

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',storage))
  async uploadFile(@UploadedFile() file,@Request() req){
    console.log(file);
    
    if(req.headers['authorization'])
    {
      const token =req.headers['authorization'].split(" ").pop();
      const decodedToken=verify(token,process.env.SECRET);
      const user =  await this.coachService.findByEmail(decodedToken['email']);
    return from(this.coachService.update(user.id,{image:file.filename})).pipe(
      tap((user:Coach)=>console.log(Coach)),
      map((user:Coach)=>({image:user.image}))
    )}
    else
    {
      return new UnauthorizedException();
    }
  }

  @Get('profile-image/:imagename')
    findProfileImage(@Param('imagename') imagename, @Res() res): Observable<Object> {
        return of(res.sendFile(join(process.cwd(), 'uploads/userImages/' + imagename)));
    }
}
