import DataSource from "./dataSource";
import { PostDTO } from "./postDTO";
import { InfiniteList } from "react-infinite-list-component/dist";

function App() {
  const dataSource = new DataSource();

  return (
    <InfiniteList dataSource={dataSource}>
      {(post: PostDTO, index) => (
        <div key={index}>
          <span>{post.id}</span>
          <span>{post.title}</span>
        </div>
      )}
    </InfiniteList>
  );
}

export default App;
