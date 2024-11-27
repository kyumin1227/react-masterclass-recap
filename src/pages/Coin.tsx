import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Coin = () => {
  const { coinId } = useParams() as { coinId: string };
  const [loading, setLoading] = useState(true);
  const { state } = useLocation() as { state: { name: string } };
  console.log(state);

  return (
    <>
      <Container>
        <Header>
          <Title>{state?.name || "Loading"}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : null}
      </Container>
    </>
  );
};

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

export default Coin;
