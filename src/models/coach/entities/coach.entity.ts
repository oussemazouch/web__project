import { Role } from 'src/common/role.enum';
import { User } from '../../user/entities/user.entity';
import { BeforeInsert, Column, Entity } from 'typeorm';
@Entity()
export class Coach extends User {
  @Column()
  description: string;
  @Column()
  programPrice: number;
  constructor() {
    super();
    // Set the default role for Coach entities
    this.role = Role.COACH;
  }
  @BeforeInsert()
  setDefaultRole() {
    if (!this.role) {
      this.role = Role.COACH;
    }
}
}