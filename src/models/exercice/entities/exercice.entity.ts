import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Exercice',
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
