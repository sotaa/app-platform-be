export interface ICRUDService<T> {
    create(entity: T) : T | Promise<T>;
    update(id: number, entity: T): T | Promise<T>;
    delete(id: number): object;
    get(condition?: object): T[] | Promise<T[]>;
    getById(id: number): T | Promise<T>;
}