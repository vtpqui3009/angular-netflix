import { MovieCard } from '../models/movie-card';
import { Genre } from '../models/genre';

export function getRandomNumber(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function getModifiedMovies(movies: MovieCard[], genres: Genre[]) {
  return movies.map((movie) => {
    const movieGenres = movie.genres;
    const convertedGenres = genres.filter((gerne) =>
      movieGenres.includes(gerne.id)
    );
    movie.genres = convertedGenres;
    return movie;
  });
}
