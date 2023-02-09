import css from './List.module.css';
import PropTypes from 'prop-types';
import ListItems from '../ListItems';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getTrendingDay } from '../../services/movieApi/api';
import Loader from '../../layouts/Loader';
import Error from '../../layouts/Error';
import { messages } from '../../const/messages';

const { errorMessage } = messages;
const List = ({ page, changeTotalPage }) => {
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    changeTotalPage(totalPage);
  }, [totalPage]);

  const { isLoading, error, isError, data } = useQuery(
    ['getTrendingDay', page],
    () => getTrendingDay(page)
  );

  if (isLoading) return <Loader />;

  if (isError || !data)
    return <Error error={error.message ?? errorMessage}></Error>;

  const {
    data: { results: movies, total_pages },
  } = data;

  if (total_pages !== totalPage) setTotalPage(total_pages);

  return <ListItems movies={movies} page={page}></ListItems>;
};

export default List;

List.propTypes = {
  page: PropTypes.number.isRequired,
  changeTotalPage: PropTypes.func.isRequired
};
