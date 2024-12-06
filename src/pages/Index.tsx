import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const boxVariants = {
  entry: (back: boolean) => ({
    x: back ? -500 : 500,
    opacity: 0,
    scale: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (back: boolean) => ({
    x: back ? 500 : -500,
    opacity: 0,
    scale: 0,
  }),
};

const index = () => {
  const [visible, setVisible] = useState(0);
  const [back, setBack] = useState(false);
  const toggleNext = () => {
    setVisible((prev) => (prev + 1) % 10);
    setBack(false);
  };
  const togglePrev = () => {
    setVisible((prev) => (prev === 0 ? 9 : prev - 1));
    setBack(true);
  };

  return (
    <Wrapper>
      <AnimatePresence custom={back}>
        <Box
          key={visible} // key가 변경되면 react는 새로운 컴포는트로 인식하여 애니메이션을 적용
          custom={back}
          variants={boxVariants}
          initial="entry"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
        >
          {visible}
        </Box>
      </AnimatePresence>
      <button onClick={toggleNext}>Next</button>
      <button onClick={togglePrev}>Prev</button>
    </Wrapper>
  );
};

const Box = styled(motion.div)`
  width: 150px;
  height: 150px;
  top: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
  font-size: 20px;
  border-radius: 35px;
  position: absolute;
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
