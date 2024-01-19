import { baseEntity } from "src/common/base.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"order"})
export class Order extends baseEntity {

    @PrimaryGeneratedColumn()
    id:number;
    @ManyToOne(() => User, 'orders')
    user: User;

    @Column()
    totalAmount: number;

    @Column({ default: false })
    isPaid: boolean;
}
