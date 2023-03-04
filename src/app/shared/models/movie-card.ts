export interface MovieCard {
  id?: number;
  imageUrl: string;
  year: number;
  name?: string;
  genres?: string[];
  overview?: string;
}
