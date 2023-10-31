import { Repository } from 'typeorm';
import { Item } from '../entities';
import { InjectRepository } from '@nestjs/typeorm';
import { IItemRepository } from 'core/repositories/item.repository';

export class ItemRepository implements IItemRepository {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
  ) {}

  async fetchAll(): Promise<Item[]> {
    const items = await this.itemRepository.find();
    return items;
  }

  async createNew(payload: Omit<Item, 'id'>): Promise<Item> {
    const createdItem = this.itemRepository.create(payload);
    const newItem = await this.itemRepository.save(createdItem);
    return newItem;
  }
}
