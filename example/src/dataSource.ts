import axios from "axios";
import { PostDTO } from "./postDTO";
import { InfiniteListDataSource } from "react-infinite-list-component/dist";

const sleep = (delay: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export default class DataSource implements InfiniteListDataSource<PostDTO> {
  data: PostDTO[] = [];
  hasNextPage: boolean = true;

  pageNumber = 0;
  pageSize = 10;

  constructor() {
    axios.interceptors.response.use(async (response) => {
      if (process.env.NODE_ENV === "development") await sleep(1000);
      return response;
    });
  }

  get getUrl() {
    return `https://jsonplaceholder.typicode.com/posts?_start=${this.pageNumber * this.pageSize}&_limit=${
      this.pageSize
    }`;
  }

  loadNextPage = async () => {
    const result = await axios.get<PostDTO[]>(this.getUrl);
    const startIndex = this.pageNumber * this.pageSize;
    this.data = [...this.data.slice(0, startIndex - 1), ...result.data];
    this.pageNumber++;
    this.hasNextPage = this.pageNumber * this.pageSize < result.headers["x-total-count"];
  };
}
