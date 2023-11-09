export type authorType = {
  _id: string;
  userName: string;
  userImage: string;
};

export type comment = {
  _id: string;
  comment: string;
  author: authorType;
  relatedPost: string;
};

export interface post {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  author: authorType;
  comments: [comment];
}

export interface contentData {
  number: number;
  posts: post[];
}

export type UserImage = {
  userImage: string;
  userWebsite: string;
  userBio: string;
};

export interface User extends UserImage {
  _id: string;
  userName: string;
  email: string;
  password: string;
  posts: [postId: string];
  favs: [postId: string];
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export type LoggingResponse = {
  msg: string;
  user: User;
  token: string;
};

export type ImageUrlUpdateResponse = {
  msg: string;
};

export type editFieldStatus = {
  inputField: boolean;
  editField: boolean;
  submitField: boolean;
};
