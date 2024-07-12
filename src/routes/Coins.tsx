import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';
import { ThemeMode } from './Coin';
import { useRecoilState } from 'recoil';
import { darkTheme, lightTheme, themeState } from '../theme';

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: grid;
  grid-template-columns: auto 1fr min-content;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${props => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
    color: black;
  }
  &:hover {
    a {
      color: ${props => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${props => props.theme.accentColor};
  justify-self: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const { isLoading, data } = useQuery<ICoin[]>({ queryKey: ['allCoins'], queryFn: fetchCoins });
  const [theme, setTheme] = useRecoilState(themeState);

  return (
    <Container>
      <Header>
        <span>홈</span>
        <Title>코인</Title>
        <ThemeMode
          onClick={() => {
            if (theme === lightTheme) {
              setTheme(darkTheme);
            } else {
              setTheme(lightTheme);
            }
          }}
        >
          Theme
        </ThemeMode>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map(coin => (
            <Coin key={coin.id}>
              <Link to={{ pathname: `/${coin.id}` }} state={{ name: coin.name }}>
                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id.toLowerCase()}.png`} />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
