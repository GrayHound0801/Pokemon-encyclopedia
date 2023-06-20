import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import MainPage from '../pages/main/Main';
import PokemonDetailPage from '../pages/components/PokemonDetailPage';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: `/pokemonDetail/:id`,
        element: <PokemonDetailPage />,
      },
    ],
  },
]);

export default router;
