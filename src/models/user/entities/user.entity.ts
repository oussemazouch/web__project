import { baseEntity } from 'src/common/base.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  address: string;
  @Column({
    unique: true,
  })
  password: string;
  @Column()
  solde: number;
  @Column()
  salt: string;
}
