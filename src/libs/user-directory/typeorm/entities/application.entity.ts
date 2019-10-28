import { IEntity } from './interfaces/entity.interface';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IApplication } from '../../interfaces/models/application.interface';

@Entity()
export class Application implements IEntity, IApplication {
  @PrimaryGeneratedColumn()
  id?: number;
  @Column()
  name: string;
  @Column()
  url: string;
  @Column()
  isActive: boolean;
}
