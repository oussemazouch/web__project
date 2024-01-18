import { baseEntity } from "src/common/base.entity";
import { Cart } from "src/models/cart/entities/cart.entity";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'user'
})
export class User extends baseEntity {
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    lastName:string;
    @Column()
    age:number;
    @Column()
    phoneNumber:number;
    @Column()
    email:string;
    @Column()
    address:string;
    @Column()
    password:string;
    @Column()
    solde:number;
    @OneToOne(() => Cart, cart => cart.user)
    cart: Cart;
}
