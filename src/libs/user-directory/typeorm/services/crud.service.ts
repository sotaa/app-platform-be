import { ICRUDService } from '../../interfaces/services/crud-service.interface';
import { Repository , FindConditions, DeleteResult } from 'typeorm';

export abstract class CRUDService<T> implements ICRUDService<T> {
  constructor(protected repository: Repository<T>) {}
  create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }

  save(entity: T): Promise<T>{
    return this.repository.save<T>(entity);
  }

  update(condition: number | object | Partial<T>, entity: T) {
    return this.repository.update(condition as FindConditions<T>, entity);
  }

  delete(id: number | number[] | object | Partial<T>): Promise<DeleteResult> {
    return this.repository.delete(id as FindConditions<T>);
  }
  find(condition?: object): Promise<T[]> {
    return this.repository.find(condition);
  }
  findById(id: number): Promise<T> {
    return this.repository.findOne(id);
  }

  findByIds(ids: number[]) {
      return this.repository.findByIds(ids);
  }
}
