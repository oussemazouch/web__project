import { baseEntity } from "src/common/base.entity";
import { Product } from "src/models/product/entities/product.entity";
import { User } from "src/models/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

    @ManyToMany(
        () => Product, 'orders',{eager:true,cascade:false}
    )
    @JoinTable(
        {name: 'orders_products',
        joinColumn: {
          name: 'orderId',
          referencedColumnName: 'id',
        },
        inverseJoinColumn: {
          name: 'productid',
          referencedColumnName: 'id',
                },
      }
    )
    products:Product[] |number[];
  
    

}
