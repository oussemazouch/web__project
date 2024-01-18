// cart.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable, Column, OneToMany } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';
import { CreateProductDto } from 'src/models/product/dto/create-product.dto';

@Entity({
    "name": "cart"
})
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToMany(() => Product) 
  @JoinTable()
  products: CreateProductDto[];

  @Column()
  totalPrice: number;
}
