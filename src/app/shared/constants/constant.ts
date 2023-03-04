export const TMDB_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_URL = 'https://image.tmdb.org/t/p/original';
export const TMDB_API_KEY = 'fa808d4f7fd1ba7f2fedd0e4ebb1add1';

export const MEDIA_QUERY_CONSTANT = {
  PC_SIZE: 1024,
  TABLET_SIZE: 720,
  PHONE_SIZE: 320,
};

export const IVY_MOVIE_URL = {
  POPULAR_MOVIES_URL: `${TMDB_URL}/movie/popular?api_key=${TMDB_API_KEY}&language=en-US&page=1`,
  GENRES_ALL_OF_MOVIE_URL: `${TMDB_URL}/genre/movie/list?api_key=${TMDB_API_KEY}&language=en-US`,
};
