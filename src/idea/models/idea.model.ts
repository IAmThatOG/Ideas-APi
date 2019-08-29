import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Unique, VersionColumn } from "typeorm";
import { version } from "@babel/core";

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
