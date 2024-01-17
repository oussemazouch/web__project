import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name:'user'
})
export class User {
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
}
