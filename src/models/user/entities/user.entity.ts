import { baseEntity } from 'src/common/base.entity';
import { Role } from 'src/common/role.enum';
import { Order } from 'src/models/order/entities/order.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user',
})
export class User extends baseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  lastName: string;
  @Column()
  age: number;
  @Column()
  phoneNumber: number;
  @Column({
    unique: true,
  })
  email: string;
  @Column()
  image : string;
  @Column()
  address: string;
  @Column()
  password: string;
  @Column()
  solde: number;
  @Column()
  salt: string;
  @Column({type: 'enum',enum:Role})
  role:Role;
  @OneToMany(()=>Order,'user')
  orders:Order[];

  @BeforeInsert()
  setDefaultRole() {
    //for testing created users are set to automatically admin
    if (!this.role) {
      this.role = Role.ADMIN;
      // this.role = Role.USER;
    }
  }

}
