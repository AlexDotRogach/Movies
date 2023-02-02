import css from './List.module.css';
import ListItems from '../ListItems';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { getTrendingDay } from '../../services/movieApi/api';
import Loader from '../../layouts/Loader';
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

  if (isError) return <span>Error: {error.message}</span>;

  if (!data) return <span>Sorry but we have troubles</span>;

  const {
    data: { results: movies, total_pages },
  } = data;

  if (total_pages !== totalPage) setTotalPage(total_pages);

  return (
    <ul className={css.list}>
      <ListItems movies={movies} page={page}></ListItems>
    </ul>
  );
};

export default List;
