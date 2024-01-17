import { User } from '../../user/entities/user.entity';
import { Column, Entity } from 'typeorm';
@Entity()
export class Coach extends User {
  @Column()
  description: string;
  @Column()
  ProgramPrice: number;
}
