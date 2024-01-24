import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercice } from '../../exercice/entities/exercice.entity';

@Entity({
  name: 'trainingprogram',
})
export class TrainingProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToMany(() => Exercice)
  @JoinTable({
    name: 'traininprogramexercices',
    joinColumn: {
      name: 'trainingprogramid',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'trainingpogram_exercice_trainingprogramid',
    },
    inverseJoinColumn: {
      name: 'exerciceid',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'exercice_trainingprogram-exerciceid',
    },
  })
  exercices: Exercice[];
}
