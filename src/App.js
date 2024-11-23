import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
`;

const rotateAnimation = keyframes`
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(360deg)
  }
`;

const Emoji = styled.span`
  font-size: 46px;
`;

const Box = styled.div`
  background-color: tomato;
  width: 200px;
  height: 200px;
  animation: ${rotateAnimation} 1s linear infinite;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 40px;
    &:hover {
      font-size: 100px;
    }
    &:active {
      opacity: 0;
    }
  }
  ${Emoji} {
    &:active {
      font-size: 100px;
    }
  }
`;

function App() {
  return (
    <Wrapper>
      <Box>
        <span>🐈</span>
        <Emoji>🔥</Emoji>
      </Box>
    </Wrapper>
  );
}

export default App;
