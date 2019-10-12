import { IEntity } from "./interfaces/entity.interface";
import { IApplication } from "../../interfaces/application.interface";
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Application implements IEntity , IApplication {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    url: string;
    @Column()
    isActive: boolean;
}