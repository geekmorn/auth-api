export type Item = {
  id: string;
  password: string;
};

export type ItemCreate = Omit<Item, 'id'>;
