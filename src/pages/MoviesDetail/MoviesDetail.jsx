import css from './MoviesDetail.module.css';
import { getMovieById } from '../../services/movieApi/api';
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
} from 'react-router-dom';
import { useQuery } from 'react-query';
import { messages, path } from '../../const/messages';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error';

const { errorMessage } = messages;
const { imageUrl500 } = path;
const MoviesDetail = () => {
  const { moviesId } = useParams();
  const { state } = useLocation();

  const pageFrom = state?.pageFrom ?? 1;

  const { isLoading, error, isError, data } = useQuery(
    [`getMovieById-${moviesId}`],
    () => getMovieById(moviesId)
  );

  if (isLoading) return <Loader />;

  if (isError) return <Error error={error?.message ?? errorMessage}></Error>;

  const movieRender = !!data;

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
    data: { poster_path, title, name, vote_average, overview, genres },
  } = data;

  const movieName = title || name;
  const score = Math.round(vote_average * 10);

  const changeActive = ({ isActive }) => `${isActive ? css.activeLink : ''}`;

  return (
    <section className={css.detail}>
      <Link to="/" className={css.goBack} state={{ pageFrom }}>
        Go back
      </Link>

      <main className={css.detailInfo}>
        <div className={css.imageWrapper}>
          <img
            className={css.image}
            src={`${imageUrl500}${poster_path}`}
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

      <section className={css.additional}>
        <h2 className={css.additionalTitle}>Additional information</h2>

        <div className={css.additionalLink}>
          <NavLink to="cast" className={changeActive}>
            Cast
          </NavLink>
          <NavLink to="reviews" className={changeActive}>
            Reviews
          </NavLink>
        </div>

        <div className={css.separator}></div>

        <Outlet></Outlet>
      </section>
    </section>
  );
};

export default MoviesDetail;
