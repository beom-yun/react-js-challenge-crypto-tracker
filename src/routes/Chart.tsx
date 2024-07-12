import { useQuery } from '@tanstack/react-query';
import { fetchCoinHistory } from '../api';
import { useOutletContext } from 'react-router-dom';
import ApexCharts from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface IHistoricalError {
  error?: string;
}

interface ChartProps {
  coinId: string;
}

export function Chart() {
  const { coinId } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[] & IHistoricalError>({
    queryKey: ['ohlcv', coinId],
    queryFn: () => fetchCoinHistory(coinId),
    refetchInterval: 10000,
  });

  return (
    <div>
      {isLoading ? (
        'Loading chart...'
      ) : data?.error ? null : (
        // <ApexCharts
        //   type="line"
        //   series={[
        //     {
        //       name: 'Price',
        //       data: data?.map(price => price.close) as number[],
        //     },
        //   ]}
        //   options={{
        //     theme: {
        //       mode: 'dark',
        //     },
        //     chart: {
        //       height: 300,
        //       width: 500,
        //       toolbar: {
        //         show: false,
        //       },
        //       background: 'transparent',
        //     },
        //     grid: { show: false },
        //     stroke: {
        //       curve: 'smooth',
        //       width: 4,
        //     },
        //     yaxis: {
        //       show: false,
        //     },
        //     xaxis: {
        //       axisBorder: { show: false },
        //       axisTicks: { show: false },
        //       labels: { show: false },
        //       type: 'datetime',
        //       categories: data?.map(price => price.time_close),
        //     },
        //     fill: {
        //       type: 'gradient',
        //       gradient: { gradientToColors: ['#0be881'], stops: [0, 100] },
        //     },
        //     colors: ['#0fbcf9'],
        //     tooltip: {
        //       y: {
        //         formatter: value => `$${value.toFixed(2)}`,
        //       },
        //     },
        //   }}
        // />
        <ApexCharts
          type="candlestick"
          series={[
            {
              name: 'Price',
              data: data?.map(price => ({
                x: new Date(price.time_open).toLocaleTimeString(),
                y: [price.open, price.high, price.low, price.close],
              })) as any,
            },
          ]}
          options={{ theme: { mode: 'dark' } }}
        />
      )}
    </div>
  );
}
