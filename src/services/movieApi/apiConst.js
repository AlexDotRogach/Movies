const key = `8c632f23c961af679604304d0473f75e`;

export const movieApiConst = {
  trendingDay: `https://api.themoviedb.org/3/trending/all/day?api_key=${key}`,
  movieById: id => `https://api.themoviedb.org/3/movie/${id}?api_key=${key}`,
  castById: id =>
    `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${key}`,
  reviewsById: id =>
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${key}`,
  genre: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}`,
};
