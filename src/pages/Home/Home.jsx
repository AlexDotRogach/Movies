import css from './Home.module.css';
import { useState } from 'react';
import List from '../../components/List';
import PaginationButton from '../../components/PaginationButton';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const [page, setPage] = useState(() => location.state?.pageFrom ?? 1);
  const [totalPage, setTotalPage] = useState(0);

  const changePage = newPage => setPage(newPage);
  const changeTotalPage = page => setTotalPage(page);

  return (
    <section className={css.trending}>
      <h3 className={css.title}>Trending today</h3>
      <List page={page} changeTotalPage={changeTotalPage}></List>
      <PaginationButton page={page} total={totalPage} changePage={changePage} />
    </section>
  );
};

export default Home;
