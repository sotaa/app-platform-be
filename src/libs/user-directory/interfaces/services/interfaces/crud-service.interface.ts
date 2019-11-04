
export interface ICRUDService<T> {
    create(entity: T) : Promise<T>;
    save(entity: T): Promise<T>;
    /**
     * update the entity with specific id or condition.
     * @param condition object id or an object that represent the condition.
     * @param entity the values needed to be updated.
     */
    update(condition: number | string | Partial<T>, entity: Partial<T>) : Promise<object>;
    delete(id: number | string | number[] | string[] | Partial<T>): Promise<object>;
    find(condition?: object): Promise<T[]>;
    findById(id: number | string):Promise<T>;
    findByIds(ids: number[] | string[]): Promise<T[]>;
}