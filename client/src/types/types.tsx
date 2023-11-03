export interface singleEntryData {
  _id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface contentData {
  number: number;
  posts: singleEntryData[];
}

export type UserImage = {
  userImage: string;
  userWebsite: string;
  userBio: string;
};

export interface User extends UserImage {
  userName: string;
  email: string;
  password: string;
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
