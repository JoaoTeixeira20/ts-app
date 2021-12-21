declare global {

    type electronStoreDataType = {
        key: string,
        value?: string
    }

    interface Window {
        electronAPI : {
            storeData({key, value}: electronStoreDataType): void;
            getData(): Record<string, string>;
            getFormKeyData({key}: electronStoreDataType): string;
            deleteData({key}: electronStoreDataType): void;
        }
    }
};

export {}
