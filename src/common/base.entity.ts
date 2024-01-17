import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Generated, UpdateDateColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
export class baseEntity {

  @Generated("uuid")
  @Column()
  uuid:string;
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    update: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    update: false,
  })
  deletedAt: Date;

  
}