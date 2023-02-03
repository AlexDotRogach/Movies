import { lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Routes, Route } from 'react-router-dom';
import css from './App.module.css';
import SharedLayout from '../../layouts/SharedLayout';
import Home from '../../pages/Home';
import Movies from '../../pages/Movies';
import MoviesDetail from '../../pages/MoviesDetail';
import Cast from '../Cast';

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
            <Route path="reviews"></Route>
          </Route>
        </Route>
      </Routes>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;
