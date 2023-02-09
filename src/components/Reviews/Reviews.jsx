import css from './Reviews.module.css';
import { useQuery } from 'react-query';
import { getCastById, getReviewsById } from '../../services/movieApi/api';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error/Error';
import { messages, path } from '../../const/messages';
import { useParams } from 'react-router-dom';

const { errorMessage } = messages;
const Reviews = () => {
  const { moviesId } = useParams();

  const { isLoading, error, isError, data } = useQuery(
    [`getReviewsById-${moviesId}`],
    () => getReviewsById(moviesId)
  );

  if (isLoading) return <Loader />;

  if (isError || !data)
    return <Error error={error?.message ?? errorMessage}></Error>;

  const {
    data: { results: reviews },
  } = data;

  if (!reviews.length)
    return <span> We don`t have any reviews for this movie</span>;

  return (
    <ul className={css.reviews}>
      {reviews.map((review, index) => {
        const { author, content, created_at } = review;

        return (
          <li key={index}>
            <div className={css.reviewHeader}>
              <span>{author}</span>
              <span>{created_at}</span>
            </div>
            <div className={css.reviewDescribe}>
              <span>{content}</span>
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Reviews;
