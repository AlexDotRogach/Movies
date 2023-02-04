import css from './Cast.module.css';
import { useQuery } from 'react-query';
import { getCastById } from '../../services/movieApi/api';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error/Error';
import { messages } from '../../const/messages';
import { useParams } from 'react-router-dom';
import { path } from '../../const/messages';

const { errorMessage } = messages;
const { imageUrl200 } = path;
const Cast = () => {
  const { moviesId } = useParams();

  const { isLoading, error, isError, data } = useQuery(
    [`getCastById-${moviesId}`],
    () => getCastById(moviesId)
  );

  if (isLoading) return <Loader />;

  if (isError || !data)
    return <Error error={error?.message ?? errorMessage}></Error>;

  const {
    data: { cast },
  } = data;

  return (
    <ul className={css.cast}>
      {cast
        .filter(person => person.profile_path)
        .map(person => {
          const { profile_path, character, name } = person;

          return (
            <li className={css.person}>
              <img
                className={css.image}
                src={`${imageUrl200}${profile_path}`}
                alt="test"
              />
              <div className={css.persontText}>
                <span className={css.personTitle}>Role: </span>
                <span>{character}</span>
              </div>
              <div className={css.persontText}>
                <span className={css.personTitle}>Name: </span>
                <span>{name}</span>
              </div>
            </li>
          );
        })}
    </ul>
  );
};

export default Cast;
