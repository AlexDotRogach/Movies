import css from './MoviesDetail.module.css';
import {
  getMovieById,
  getCastById,
  getReviewsById,
} from '../../services/movieApi/api';
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { useQueries } from 'react-query';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error';
const MoviesDetail = () => {
  const { moviesId } = useParams();
  const { state } = useLocation();

  const pageFrom = state?.pageFrom ?? 1;

  const movieInfoQueries = useQueries([
    {
      queryKey: `getMovieById-${moviesId}`,
      queryFn: () => getMovieById(moviesId),
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
        <Link to="/" className={css.goBackError} state={{ pageFrom }}>
          Go back
        </Link>
        <Error error="This movie isn`t found"></Error>
      </>
    );

  const {
    data: {
      data: { poster_path, title, name, vote_average, overview, genres },
    },
  } = movieQuery;

  const movieName = title || name;
  const score = Math.round(vote_average * 10);

  return (
    <section className={css.detail}>
      <Link to="/" className={css.goBack} state={{ pageFrom }}>
        Go back
      </Link>

      <main className={css.detailInfo}>
        <div className={css.imageWrapper}>
          <img
            className={css.image}
            src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
            alt={movieName}
          />
        </div>
        <div className={css.movieInfo}>
          <h2 className={css.movieTitle}>{movieName}</h2>
          <div className={css.movieScore}>
            <span className={css.movieScoreText}>User score:</span>
            <span>{score}%</span>
          </div>
          <div>
            <span className={css.movieOverviewText}>
              <span className={css.movieOverviewTitle}>Overview:</span>
              {overview}
            </span>
          </div>
          <div className={css.movieGenres}>
            <span className={css.movieGenreTitle}>Genres:</span>
            {genres.map((genre, index) => (
              <span key={index}>{`${genre.name}${
                genres.length - 1 === index ? '' : ','
              }`}</span>
            ))}
          </div>
        </div>
      </main>

      <section>
        <h2>Additional information</h2>

        <NavLink to="cast">Cast</NavLink>

        <Outlet></Outlet>
      </section>
    </section>
  );
};

export default MoviesDetail;
