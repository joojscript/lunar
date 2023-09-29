import { Injectable } from '@nestjs/common';

@Injectable()
export class MemoryStoreService {
  private readonly store: Record<string, any> = {};

  get(key: string) {
    return this.store[key];
  }

  set(key: string, value: any) {
    this.store[key] = value;
  }

  append(key: string, value: any) {
    this.store[key] = { ...this.store[key], ...value };
  }

  delete(key: string) {
    delete this.store[key];
  }

  deleteKeyFromObject(key: string, objectKey: string) {
    delete this.store[key][objectKey];
  }
}
