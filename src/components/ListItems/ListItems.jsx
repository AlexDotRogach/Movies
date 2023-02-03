import css from './ListItems.module.css';
import { Link } from 'react-router-dom';
import { getGenre } from '../../services/movieApi/api';
import { useQuery } from 'react-query';
import { ReactComponent as Image18 } from '../../assets/18+.svg';
import { path } from '../../const/messages';

const { imageUrl200 } = path;
const ListItems = ({ movies, page }) => {
  const { data } = useQuery('genre', getGenre);
  const defaultGenres = ['no genres'];

  const getGenreByArrId = (genreArrId = []) => {
    if (!data) return defaultGenres;

    const {
      data: { genres },
    } = data;

    if (!genres.length) return defaultGenres;

    const filterGenres = genres
      .filter(genre => genreArrId.includes(genre.id))
      .map(genre => genre.name);

    if (!filterGenres.length) return defaultGenres;

    return filterGenres;
  };

  return (
    <>
      {movies.map(movie => {
        const name = movie.title || movie.name;
        const { id, vote_average, vote_count, genre_ids, poster_path, adult } =
          movie;

        if (!poster_path) return;

        const genresArr = getGenreByArrId(genre_ids);

        if (genresArr.length > 4) {
          genresArr.length = 4;
          genresArr.push('...');
        }

        return (
          <li className={css.listItem} key={id}>
            <Link
              to={`movies/${id}`}
              state={{ pageFrom: page }}
              className={css.listItemLink}
            >
              <div className={css.imageWrapper}>
                {adult && (
                  <div className={css.imageLimitationWrapper}>
                    <Image18 className={css.imageLimitationImg} />
                  </div>
                )}

                <img
                  className={css.image}
                  src={`${imageUrl200}${poster_path}`}
                  alt={name}
                />
              </div>

              <div className={css.title}>{name}</div>
              <div className={css.backWrapper}>
                <div className={css.backTitle}>{name}</div>
                <div className={css.genreWrapper}>
                  <span className={css.genreTitle}>Genre:</span>
                  <ul className={css.genreList}>
                    {genresArr.map((genre, index) => (
                      <li key={index}>{genre}</li>
                    ))}
                  </ul>
                </div>
                <div className={css.statistic}>
                  <div className={css.votes}>
                    <div className={css.votesWrapper}>
                      <span className={css.votesTitle}>Votes:</span>
                      <span className={css.votesValue}>
                        {Math.round(vote_average)}
                      </span>
                      <span>/10</span>
                    </div>
                  </div>

                  <div className={css.count}>
                    <span className={css.countTitle}>Count:</span>
                    <span>{vote_count}</span>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default ListItems;
