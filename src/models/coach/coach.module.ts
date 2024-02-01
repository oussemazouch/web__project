import { Module } from '@nestjs/common';
import { CoachService } from './coach.service';
import { CoachController } from './coach.controller';
import { Coach } from './entities/coach.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [CoachController],
  providers: [CoachService],
  imports: [TypeOrmModule.forFeature([Coach]),
  PassportModule.register({
    defaultStrategy: 'jwt',
  }),
  JwtModule.register({
    secret: process.env.SECRET,
    signOptions: {
      expiresIn: 3600,
    },
  }),],
  exports:[CoachService],
})
export class CoachModule {}
