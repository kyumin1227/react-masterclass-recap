import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const index = () => {
  const [clicked, setClicked] = useState(false);
  const toggle = () => setClicked((prev) => !prev);

  const [boxId, setBoxId] = useState<number | null>(null);

  return (
    <Wrapper onClick={toggle}>
      <AnimatePresence>
        <Grid>
          {[0, 1, 2, 3].map((id) => (
            <Box key={id} onClick={() => setBoxId(id)} layoutId={id + ""} />
          ))}
        </Grid>
        {clicked ? (
          <Overlay
            onClick={() => setBoxId(null)}
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            exit={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId={`${boxId}`} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
    </Wrapper>
  );
};

const Overlay = styled(motion.div)`
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  width: 50vw;
  gap: 10px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  div:first-child,
  div:last-child {
    grid-column: span 2;
  }
`;

const Box = styled(motion.div)`
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 40px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Wrapper = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export default index;
