export type InfiniteListDataSource<T> = {
    data: T[];
    hasNextPage: boolean;
    loadNextPage(): Promise<void>;
};
