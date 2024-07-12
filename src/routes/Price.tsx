import { useQuery } from '@tanstack/react-query';
import { PriceData } from './Coin';
import { useOutletContext } from 'react-router-dom';
import { fetchCoinTickers } from '../api';
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
  font-size: 16px;
`;

const ListItem = styled.li`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  &:hover {
    color: ${props => props.theme.accentColor};
  }
`;

const ListItemTitle = styled.span`
  justify-self: self-end;
`;

interface PriceProps {
  coinId: string;
}

function Price() {
  const { coinId } = useOutletContext<PriceProps>();
  const { isLoading, data } = useQuery<PriceData>({
    queryKey: ['tickers', coinId],
    queryFn: () => fetchCoinTickers(coinId!),
    refetchInterval: 5000,
  });
  return (
    <>
      {isLoading ? (
        'Loading Price...'
      ) : (
        <List>
          <ListItem>
            <ListItemTitle>name</ListItemTitle>
            {data?.name}
          </ListItem>
          <ListItem>
            <ListItemTitle>symbol</ListItemTitle>
            {data?.symbol}
          </ListItem>
          <ListItem>
            <ListItemTitle>rank</ListItemTitle>
            {data?.rank}
          </ListItem>
          <ListItem>
            <ListItemTitle>circulating_supply</ListItemTitle>
            {data?.circulating_supply}
          </ListItem>
          <ListItem>
            <ListItemTitle>total_supply</ListItemTitle>
            {data?.total_supply}
          </ListItem>
          <ListItem>
            <ListItemTitle>max_supply</ListItemTitle>
            {data?.max_supply}
          </ListItem>
          <ListItem>
            <ListItemTitle>beta_value</ListItemTitle>
            {data?.beta_value}
          </ListItem>
          <ListItem>
            <ListItemTitle>first_data_at</ListItemTitle>
            {data?.first_data_at}
          </ListItem>
          <ListItem>
            <ListItemTitle>last_updated</ListItemTitle>
            {data?.last_updated}
          </ListItem>
        </List>
      )}
    </>
  );
}

export default Price;
