import {Entity , Column, PrimaryGeneratedColumn} from 'typeorm';
import { ProductType } from '../enums/product-type.enum';
import { baseEntity } from 'src/common/base.entity';



@Entity({
    name:'product'
})
export class Product extends baseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description:string;

    @Column()
    photo:string;

    @Column()
    price:number;

    @Column({type: 'enum', enum: ProductType})
    productType: ProductType
    
}
export { ProductType };

