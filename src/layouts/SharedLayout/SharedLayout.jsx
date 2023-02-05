import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import css from './SharedLayout.module.css';
import Header from '../../components/Header';
import Loader from '../Loader';

const SharedLayout = () => {
  return (
    <>
      <Header></Header>
      <Suspense fallback={<Loader />}>
        <Outlet></Outlet>
      </Suspense>
    </>
  );
};

export default SharedLayout;
