import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exercice } from '../../exercice/entities/exercice.entity';

@Entity({
  name: 'TrainingProgram',
})
export class TrainingProgram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @ManyToMany(() => Exercice)
  @JoinTable({
    name: 'traininProgramExercices',
    joinColumn: {
      name: 'trainingProgramId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'trainingPogram_Exercice_trainingProgramId',
    },
    inverseJoinColumn: {
      name: 'ExerciceId',
      referencedColumnName: 'id',
      foreignKeyConstraintName: 'Exercice_trainingProgram-ExerciceId',
    },
  })
  exercices: Exercice[];
}
