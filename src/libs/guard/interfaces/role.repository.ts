import { IRole } from ".";

export interface IRoleRepository {
   save(role: IRole): Promise<IRole>;
   /**
    * Load stored roles based on custom filter.
    * @param filter filter object
    * @param loadChildren If true will load children roles, default value is false.
    */
   find(filter?: FindManyOptions<IRole>): Promise<IRole[]>;
   findOne(filter: FindOneOptions<IRole>): Promise<IRole>;
   update(filter: FindConditions<IRole>, role: IRole): Promise<any>;
   delete(filter: FindConditions<IRole>): Promise<any>;
}

export declare type FindConditions<T> = {
   [P in keyof T]?: T[P] extends never ? FindConditions<T[P]> : FindConditions<T[P]>;
};

export interface FindOneOptions<Entity = any> {
   /**
    * Specifies what columns should be retrieved.
    */
   select?: (keyof Entity)[];
   /**
    * Simple condition that should be applied to match entities.
    */
   where?: FindConditions<Entity>[] | FindConditions<Entity> | string;
   /**
    * Indicates what relations of entity should be loaded (simplified left join form).
    */
   relations?: string[];
}

export declare type OrderByCondition = {
   [columnName: string]: ("ASC" | "DESC") | {
       order: "ASC" | "DESC";
       nulls?: "NULLS FIRST" | "NULLS LAST";
   };
};

export interface FindManyOptions<Entity = any> extends FindOneOptions<Entity> {
   /**
    * Offset (paginated) where from entities should be taken.
    */
   skip?: number;
   /**
    * Limit (paginated) - max number of entities should be taken.
    */
   take?: number;
}
