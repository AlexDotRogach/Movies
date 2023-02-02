import css from './MoviesDetail.module.css';
import {
  getMovieById,
  getCastById,
  getReviewsById,
} from '../../services/movieApi/api';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQueries } from 'react-query';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error';
const App = () => {
  const { moviesId } = useParams();
  const location = useLocation();
  const {
    state: { pageFrom },
  } = location;

  const movieInfoQueries = useQueries([
    {
      queryKey: `getMovieById-${moviesId}`,
      queryFn: () => getMovieById(23),
    },

    {
      queryKey: `getCastById-${moviesId}`,
      queryFn: () => getCastById(moviesId),
    },

    {
      queryKey: `getReviewsById-${moviesId}`,
      queryFn: () => getReviewsById(moviesId),
    },
  ]);

  const [movieQuery, castQuery, reviewsQuery] = movieInfoQueries;

  if (movieQuery.isLoading || castQuery.isLoading || reviewsQuery.isLoading)
    return <Loader />;

  const movieRender = !!movieQuery.data;

  if (!movieRender)
    return (
      <>
        <Link to="/" className={css.goBackError}>
          Go back
        </Link>
        <Error error="This movie isn`t found"></Error>
      </>
    );

  const {
    data: {
      data: { poster_path, title, name },
    },
  } = movieQuery;

  const movieName = title || name;

  return (
    <section className={css.detail}>
      <Link to="/" className={css.goBack}>
        Go back
      </Link>

      {movieRender && (
        <main className={css.detailInfo}>
          <div className={css.imageWrapper}>
            <img
              className={css.image}
              src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
              alt={movieName}
            />
          </div>
          <div className={css.infoMovie}>
            <h2 className={css.movieTitle}>{movieName}</h2>
          </div>
        </main>
      )}
    </section>
  );
};

export default App;
