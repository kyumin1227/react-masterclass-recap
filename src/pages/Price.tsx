import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { fetchCoinTickers } from "../api";
import styled from "styled-components";
import { PriceData } from "./Coin";

const Price = () => {
  const { state } = useLocation() as { state: { coinId: string; name: string } };
  const { isLoading, data } = useQuery<PriceData>(["tickers", state.name], () => fetchCoinTickers(state.coinId));
  return (
    <>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Volume24h</span>
              <span>{data?.quotes.USD.volume_24h}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Volume24hChange</span>
              <span>{data?.quotes.USD.volume_24h_change_24h}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Market cap</span>
              <span>{data?.quotes.USD.market_cap}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Market cap change</span>
              <span>{data?.quotes.USD.market_cap_change_24h}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Percent change 1h</span>
              <span>{data?.quotes.USD.percent_change_1h}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Percent change 12h</span>
              <span>{data?.quotes.USD.percent_change_12h}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Percent change 24h</span>
              <span>{data?.quotes.USD.percent_change_24h}</span>
            </OverviewItem>
          </Overview>
          <Overview>
            <OverviewItem>
              <span>Percent change 7d</span>
              <span>{data?.quotes.USD.percent_change_7d}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Percent change 30d</span>
              <span>{data?.quotes.USD.percent_change_30d}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Percent change 1y</span>
              <span>{data?.quotes.USD.percent_change_1y}</span>
            </OverviewItem>
          </Overview>
        </>
      )}
    </>
  );
};

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  margin-bottom: 10px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

export default Price;
