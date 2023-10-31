import { hash, compare } from 'bcrypt';

class Bcrypt {
  async encrypt(value: string) {
    const encrypted = await hash(value, 8);
    return encrypted;
  }

  async verify(value: string, encrypted: string) {
    const result = await compare(value, encrypted);
    return result;
  }
}

export const bcrypt = new Bcrypt();
