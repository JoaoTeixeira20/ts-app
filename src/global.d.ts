declare global {
  type electronStoreDataType = {
    key: string;
    value?: string;
  };

  interface Window {
    electronAPI: {
      storeData(value: {}): void;
      getData(): string;
      getFormKeyData({ key }: electronStoreDataType): string;
      deleteData({ key }: electronStoreDataType): void;
    };
  }
}

export {};
