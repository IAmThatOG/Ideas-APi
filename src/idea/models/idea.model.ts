import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('idea')
export class Idea {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  idea: string;

  @Column('text')
  description: string;

  @CreateDateColumn()
  dateCreated: Date;

  @UpdateDateColumn()
  dateUpdated: Date;
}
