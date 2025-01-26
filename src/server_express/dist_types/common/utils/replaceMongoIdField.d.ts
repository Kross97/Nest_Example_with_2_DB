type TEntity<T extends {
    _id: string;
}> = Omit<T, "_id"> & {
    id: string;
};
export declare const replaceMongoIdField: <T extends {
    _id: string;
}>(list: T[]) => TEntity<T>[];
export {};
//# sourceMappingURL=replaceMongoIdField.d.ts.map