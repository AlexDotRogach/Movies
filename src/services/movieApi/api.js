import axios from 'axios';
import { movieApiConst } from './apiConst';

const { trendingDay, movieById, castById, reviewsById, genre } = movieApiConst;
export const getTrendingDay = page => {
  return axios.get(`${trendingDay}&page=${page}`).catch(function (error) {
    console.log(
      `Request error, try to find trending of day. Error -  ${error}`
    );
  });
};
export const getMovieById = id => {
  return axios.get(`${movieById(id)}`).catch(function (error) {
    console.log(`Request error, try to find a movie. Error - ${error}`);
  });
};

export const getCastById = id => {
  return axios.get(`${castById(id)}`).catch(function (error) {
    console.log(`Request error, try to find a cast. Error - ${error}`);
  });
};

export const getReviewsById = id => {
  return axios.get(`${reviewsById(id)}`).catch(function (error) {
    console.log(`Request error, try to find reviews. Error - ${error}`);
  });
};

export const getGenre = () => {
  return axios.get(`${genre}`).catch(function (error) {
    console.log(`Request error, try to find genres. Error - ${error}`);
  });
};
