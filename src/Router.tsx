import { createBrowserRouter, useOutletContext } from 'react-router-dom';
import Coin from './routes/Coin';
import Coins from './routes/Coins';
import Price from './routes/Price';
import { Chart } from './routes/Chart';

const router = createBrowserRouter(
  [
    { path: '/', element: <Coins /> },
    {
      path: ':coinId',
      element: <Coin />,
      children: [
        { path: 'chart', element: <Chart /> },
        { path: 'price', element: <Price /> },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
