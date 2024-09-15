# @idevelopment-hu/react-infinite-list

Simple React infinite list component implemented with IntersectionObserver API

## Install

```bash
  npm install --save @idevelopment-hu/react-infinite-list
  
  or

  yarn add @idevelopment-hu/react-infinite-list

```

## Using

```jsx
// create DTO for the data
export type PostDTO = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

// implement InfiniteListDataSource<T>
import { InfiniteListDataSource } from "@idevelopment-hu/react-infinite-list";

export default class DataSource implements InfiniteListDataSource<PostDTO> {
  data: PostDTO[] = [];
  hasNextPage: boolean = true;

  loadNextPage = async () => {
    // load next data then update this.data
  };
}

// use the InfiniteList component
import { InfiniteList } from "@idevelopment-hu/react-infinite-list";

<InfiniteList dataSource={dataSource}>
    {(post: PostDTO, index) => (
    <div key={index}>
        <span>{post.id}</span>
        <span>{post.title}</span>
    </div>
    )}
</InfiniteList>

```

See [example](/example) for more details
