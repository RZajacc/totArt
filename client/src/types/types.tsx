export interface singleEntryData {
  id: string;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
}

export interface contentData {
  number: number;
  posts: singleEntryData[];
}
