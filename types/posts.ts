export interface Comment {
  _id: string;
  content: string;
  commentCreator: {
    _id: string;
    name: string;
    photo: string;
  };
  post: string;
  createdAt: string;
}

export interface Post {
  _id: string;
  body: string;
  image: string;
  user: {
    _id: string;
    name: string;
    photo: string;
  };
  createdAt: string;
  comments: Comment[];
}

export interface PostsResponse {
  message: string;
  paginationInfo: {
    currentPage: number;
    numberOfPage: number;
    limit: number;
    nextPage: number;
    total: number;
  };
  Posts: Post[];
}

export interface CreatePostRequest {
  body: string;
  image?: File;
}