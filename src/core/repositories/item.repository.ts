import { Item } from '../entities/item.entity';

export abstract class IItemRepository {
  abstract fetchAll(): Promise<Item[]>;
  abstract createNew(payload: Omit<Item, 'id'>): Promise<Item>;
}
