import { Link } from "react-router-dom";
import styled from "styled-components";

const coins = [
  { id: "btc-bitcoin", name: "Bitcoin", symbol: "BTC", rank: 1, is_new: false, is_active: true, type: "coin" },
  { id: "eth-ethereum", name: "Ethereum", symbol: "ETH", rank: 2, is_new: false, is_active: true, type: "coin" },
  { id: "usdt-tether", name: "Tether", symbol: "USDT", rank: 3, is_new: false, is_active: true, type: "token" },
  { id: "sol-solana", name: "Solana", symbol: "SOL", rank: 4, is_new: false, is_active: true, type: "coin" },
  {
    id: "bnb-binance-coin",
    name: "Binance Coin",
    symbol: "BNB",
    rank: 5,
    is_new: false,
    is_active: true,
    type: "coin",
  },
  { id: "xrp-xrp", name: "XRP", symbol: "XRP", rank: 6, is_new: false, is_active: true, type: "coin" },
  { id: "doge-dogecoin", name: "Dogecoin", symbol: "DOGE", rank: 7, is_new: false, is_active: true, type: "coin" },
  { id: "usdc-usd-coin", name: "USDC", symbol: "USDC", rank: 8, is_new: false, is_active: true, type: "token" },
  { id: "ada-cardano", name: "Cardano", symbol: "ADA", rank: 9, is_new: false, is_active: true, type: "coin" },
  {
    id: "steth-lido-staked-ether",
    name: "Lido Staked Ether",
    symbol: "STETH",
    rank: 10,
    is_new: false,
    is_active: true,
    type: "token",
  },
  { id: "avax-avalanche", name: "Avalanche", symbol: "AVAX", rank: 11, is_new: false, is_active: true, type: "coin" },
  { id: "trx-tron", name: "TRON", symbol: "TRX", rank: 12, is_new: false, is_active: true, type: "coin" },
  {
    id: "toncoin-the-open-network",
    name: "Toncoin",
    symbol: "TON",
    rank: 13,
    is_new: false,
    is_active: true,
    type: "coin",
  },
];

const Coins = () => {
  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      <CoinsList>
        {coins.map((coin) => (
          <Coin key={coin.id}>
            <Link to={`/${coin.id}`}>{coin.name} &rarr; </Link>
          </Coin>
        ))}
      </CoinsList>
    </Container>
  );
};

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    padding: 20px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

export default Coins;
