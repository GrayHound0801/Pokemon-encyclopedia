import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/Layout';
import MainPage from '../pages/main/Main';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
    ],
  },
]);

export default router;
