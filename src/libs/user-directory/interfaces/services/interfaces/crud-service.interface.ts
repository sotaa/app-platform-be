export interface ICRUDService<T> {
    create(entity: T) : T | Promise<T>;
    save(entity: T): T | Promise<T>;
    update(condition: number | string | Partial<T>, entity: Partial<T>) : Promise<object>;
    delete(id: number | string | number[] | string[] | Partial<T>): object | Promise<object>;
    find(condition?: object): T[] | Promise<T[]>;
    findById(id: number | string): T | Promise<T>;
    findByIds(ids: number[] | string[]): T[] | Promise<T[]>;
}