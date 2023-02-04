import css from './Movies.module.css';
import { useQuery } from 'react-query';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error/Error';
import { getMovieByQuery } from '../../services/movieApi/api';
import { messages } from '../../const/messages';
import MovieSearch from '../../forms/MovieSearch';
import { useEffect, useMemo, useState } from 'react';
import ListItems from '../../components/ListItems';

const { errorMessage } = messages;

const Movies = () => {
  const [query, setQuery] = useState('');

  const { isLoading, error, isError, data } = useQuery(
    [`getMovieByQuery-${query}`],
    () => query && getMovieByQuery(query)
  );

  if (isLoading) return <Loader />;

  if (isError) return <Error error={error?.message ?? errorMessage}></Error>;

  const searchMovie = e => {
    e.preventDefault();

    const {
      currentTarget: {
        elements: {
          query: { value },
        },
      },
    } = e;

    setQuery(value);
  };

  return (
    <>
      <MovieSearch searchMovie={searchMovie}></MovieSearch>
      {data && <ListItems movies={data.data.results} page={1}></ListItems>}
    </>
  );
};

export default Movies;
