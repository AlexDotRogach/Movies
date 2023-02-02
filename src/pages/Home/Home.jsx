import css from './Home.module.css';
import { useState } from 'react';
import List from '../../components/List';
import PaginationButton from '../../components/PaginationButton';

const Home = () => {
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);

  const changePage = newPage => setPage(newPage);
  const changeTotalPage = page => setTotalPage(page);

  return (
    <section className={css.trending}>
      <h3 className={css.title}>Trending today</h3>
      <List page={page} changeTotalPage={changeTotalPage}></List>
      <PaginationButton total={totalPage} changePage={changePage} />
    </section>
  );
};

export default Home;
