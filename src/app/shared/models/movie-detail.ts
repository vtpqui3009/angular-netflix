import { Genre } from './genre';

export interface MovieDetail {
  id: number;
  posterUrl: string;
  backdropUrl: string;
  name: string;
  genres: Genre[];
  overview: string;
  videos: any;
}
