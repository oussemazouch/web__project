import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
export class baseEntity {
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