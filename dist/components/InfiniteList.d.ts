import { InfiniteListDataSource } from "../models/infiniteListDataSource";
import React from "react";
type Props<T> = {
    dataSource: InfiniteListDataSource<T>;
    children: (item: T, index: number) => JSX.Element;
    loader?: JSX.Element;
};
export declare function InfiniteList<T>({ dataSource, children, loader }: Props<T>): React.JSX.Element;
export {};
