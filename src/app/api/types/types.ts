export interface Post {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  categories: CategoriesEnum[];
}

export enum CategoriesEnum {
  "All" = 2,
  "Books" ,
  "Accessories",
  "Music",
  "Toys",
  "Audiobooks",
  "News",
}

export interface ServerResponse {
  posts: Post[],
  hasMore: boolean;
}

export type Category = keyof typeof CategoriesEnum;
