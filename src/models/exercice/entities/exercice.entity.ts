import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'exercice',
})
export class Exercice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column()
  sets: number;
  @Column()
  reps: number;
}
