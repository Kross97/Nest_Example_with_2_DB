type TEntity<T extends { _id: string }> = Omit<T, "_id"> & { id: string };

export const replaceMongoIdField = <T extends { _id: string }>(list: T[]): TEntity<T>[] => {
  return list.map(({ _id, ...entity }) => ({ id: _id, ...entity })) as TEntity<T>[];
};
