import { getConnection } from 'typeorm';

export async function clean() {
  const entities = await getEntities();
  try {
    for (const entity of entities) {
      const repository = await this.databaseService.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName};`);
    }
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}

async function getEntities() {
  const entities: { name: any; tableName: any }[] = [];
  (await  getConnection().entityMetadatas).forEach(
    (x: { name: any; tableName: any }) =>
      entities.push({ name: x.name, tableName: x.tableName })
  );
  return entities;
}
