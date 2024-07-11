import { createBrowserRouter } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Chart from './routes/Chart';
import Price from './routes/Price';

const router = createBrowserRouter([
  { path: '/', element: <Coins /> },
  {
    path: ':coinId',
    element: <Coin />,
    children: [
      { path: 'chart', element: <Chart /> },
      { path: 'price', element: <Price /> },
    ],
  },
]);

export default router;
