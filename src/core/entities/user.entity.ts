export type User = {
  id: string;
  password: string;
};

export type UserCreate = Omit<User, 'id'>;
