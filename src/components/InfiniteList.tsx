import { useCallback, useEffect, useRef, useState } from "react";
import { InfiniteListDataSource } from "../models/infiniteListDataSource";
import React = require("react");

type Props<T> = {
  dataSource: InfiniteListDataSource<T>;
  children: (item: T, index: number) => JSX.Element;
  loader?: JSX.Element;
};

export default function InfiniteList<T>({ dataSource, children, loader }: Props<T>) {
  const { hasNextPage, loadNextPage } = dataSource;
  const [data, setData] = useState(Array<T>);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef(null);

  const fetchNextData = useCallback(async () => {
    if (isLoading || !hasNextPage) return;

    setIsLoading(true);
    loadNextPage().then(() => {
      setData(dataSource.data);
      setIsLoading(false);
    });
  }, [isLoading, hasNextPage, loadNextPage, dataSource]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting) {
        fetchNextData();
      }
    });

    const current = loaderRef.current;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, [fetchNextData]);

  const renderLoader = () => {
    if (isLoading) {
      return loader ? loader : <span>LOADING</span>;
    } else {
      return <span></span>;
    }
  };

  return (
    <>
      {data.map((item, index) => children(item, index))}
      <div ref={loaderRef}>{renderLoader()}</div>
    </>
  );
}
