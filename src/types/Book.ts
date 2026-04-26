export interface Book {
  _id: string;
  title: string;
  author: string;
  coverUrl: string; 
  description?: string;
  genre?: string;
  totalPages: string;
}
