import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";

const index = () => {
  const [clicked, setClicked] = useState(false);
  const toggle = () => {
    setClicked((prev) => !prev);
  };

  const toggleButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setCircleId((prev) => !prev);
  };

  const [boxId, setBoxId] = useState<number | null>(null);

  const [circleId, setCircleId] = useState(false); // 원의 위치를 결정

  //   박스가 클릭되었을 때 확대되는 기준점
  const origin = [
    [1, 1],
    [0, 1],
    [1, 0],
    [0, 0],
  ];

  return (
    <Wrapper onClick={toggle}>
      <AnimatePresence>
        <Grid>
          {[0, 1, 2, 3].map((id) => (
            <Box
              key={id}
              onClick={() => setBoxId(id)}
              layoutId={id + ""}
              style={{ originX: origin[id][0], originY: origin[id][1] }}
              whileHover={{ scale: 1.1 }}
            >
              {id === 1 && !circleId ? (
                <Circle layoutId="circle" />
              ) : id === 2 && circleId ? (
                <Circle layoutId="circle" />
              ) : null}
            </Box>
          ))}
        </Grid>
        {clicked ? (
          <Overlay
            onClick={() => setBoxId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId={`${boxId}`} style={{ width: 400, height: 300, backgroundColor: "rgba(255, 255, 255, 1)" }} />
          </Overlay>
        ) : null}
        <Button
          onClick={toggleButton}
          style={{ color: circleId ? "rgb(255, 106, 0)" : "rgb(0, 132, 255)", scale: circleId ? 1.1 : 1 }}
        >
          Switch
        </Button>
      </AnimatePresence>
    </Wrapper>
  );
};

const Button = styled(motion.button)`
  width: 65px;
  height: 28px;
  margin-top: 50px;
  border-radius: 5px;
  border: none;
  font-weight: bold;
  z-index: 1;
`;

const Circle = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: white;
`;

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Grid = styled.div`
  width: 50vw;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

const Box = styled(motion.div)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 10px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default index;
