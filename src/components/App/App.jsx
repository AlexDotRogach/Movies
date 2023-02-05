import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import SharedLayout from '../../layouts/SharedLayout';
import Cast from '../Cast';
import Reviews from '../Reviews';

const Home = lazy(() => import('../../pages/Home'));
const Movies = lazy(() => import('../../pages/Movies'));
const MoviesDetail = lazy(() => import('../../pages/MoviesDetail'));

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="movies" element={<Movies />} />
          <Route path="movies/:moviesId" element={<MoviesDetail />}>
            <Route path="cast" element={<Cast />}></Route>
            <Route path="reviews" element={<Reviews />}></Route>
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
