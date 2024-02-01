import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  Request,
  Res,
  UnauthorizedException, Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { JwtAuthGuard } from './Guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/common/docrators/roles.decorator';
import { Role } from 'src/common/role.enum';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable, from, map, of, tap } from 'rxjs';
import { diskStorage } from 'multer';
import path = require('path');
import {v4 as uuidv4} from 'uuid';
import { User } from './entities/user.entity';
import { join } from 'path';
import { verify } from "jsonwebtoken";
import {Page} from "../../common/dtos/page.dto";
import {Pagination} from "nestjs-typeorm-paginate";


//variable for the storage of file uploaded
export const storage = {
  
    storage: diskStorage({
      destination: './uploads/userImages',
      filename: (req, file, cb) => {
        const fileName:string = path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
        const extension: string = path.parse(file.originalname).ext;
        cb(null, `${fileName}${extension}`)
      }
    })
  
}



@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.userService.register(createUserDto);
  }
  
  @Post('login')
  login(@Body() credentials: LoginCredentialsDto) {
    return this.userService.login(credentials);
  }

  // @UseGuards(JwtAuthGuard,RolesGuard)
  // @Roles(Role.ADMIN)
  @Get('')
  findAll() {
    return this.userService.findAll();
  }
 @Get('list')
 async getUsersByPage(@Query()PageData:Page):Promise<Pagination<User>>
 {
    return this.userService.paginate({
      page:PageData.page,
      limit:PageData.limit
    });
 }

  // @Get('TestingToken')
  // @UseGuards(JwtAuthGuard)
  // test() {
  //   return this.userService.token_authorization_testing();
  // }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(JwtAuthGuard,RolesGuard)
  @Roles(Role.ADMIN,Role.USER)
  @Get('email/:email')
  findByEmail(@Param('email') email: string) {

    return this.userService.findByEmail(email);
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

  
  @Post('upload')
  @UseInterceptors(FileInterceptor('file',storage))
  async uploadFile(@UploadedFile() file,@Request() req){
    console.log(file);
    
    if(req.headers['authorization'])
    {
      const token =req.headers['authorization'].split(" ").pop();
      const decodedToken=verify(token,process.env.SECRET);
      const user =  await this.userService.findByEmail(decodedToken['email']);
    return from(this.userService.update(user.id,{image:file.filename})).pipe(
      tap((user:User)=>console.log(user)),
      map((user:User)=>({image:user.image}))
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
