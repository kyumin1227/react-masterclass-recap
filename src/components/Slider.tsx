import { AnimatePresence, motion } from "motion/react";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { useQuery } from "react-query";
import { IGetMoviesResult } from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { clickBoxState } from "../atom";

const boxVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.3, y: -50, transition: { delay: 0.3 } },
};

const infoVariants = {
  hover: { opacity: 1, transition: { delay: 0.3 } },
};

interface SliderProps {
  getDataApi: () => Promise<IGetMoviesResult>;
  dataName: string;
  type: "movie" | "tv";
}

const Slider = ({ getDataApi, dataName, type }: SliderProps) => {
  const navigate = useNavigate();
  const setClickBoxState = useSetRecoilState(clickBoxState);

  const { data, isLoading } = useQuery<IGetMoviesResult>([`${type}`, `${dataName}`], getDataApi);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [isNext, setIsNext] = useState(true);
  const offset = 6;

  const rowVariants = {
    hidden: { x: isNext ? window.outerWidth + 5 : -window.outerWidth - 5 },
    visible: { x: 0 },
    exit: (direction: boolean) => ({
      x: direction ? -window.outerWidth - 5 : window.outerWidth + 5,
    }),
  };

  const handleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClick = (e: React.MouseEvent<HTMLDivElement>, movieId: number) => {
    e.stopPropagation();
    navigate(`${type === "movie" ? "movie/" : ""}${movieId}`);
    setClickBoxState(movieId + " " + dataName);
  };

  const handleButtonClick = (temp: string) => {
    if (data) {
      if (leaving) return;
      handleLeaving();
      const totalMovies = data?.results.length - 1;
      console.log(totalMovies);

      if (temp === "next") {
        setIndex((prev) => (prev === Math.ceil(totalMovies / offset) - 1 ? 0 : prev + 1));
        setIsNext(true);
      } else {
        setIndex((prev) => (prev === 0 ? Math.ceil(totalMovies / offset) - 1 : prev - 1));
        setIsNext(false);
      }
    }
  };

  return (
    <Wrapper>
      <DataTitleAndButtonWrapper>
        <DataTitle>{dataName}</DataTitle>
        <NextAndPrevButton onClick={() => handleButtonClick("prev")}>Prev</NextAndPrevButton>
        <NextAndPrevButton onClick={() => handleButtonClick("next")}>Next</NextAndPrevButton>
      </DataTitleAndButtonWrapper>
      {isLoading ? (
        "Loading..."
      ) : (
        <AnimatePresence initial={false} custom={isNext} onExitComplete={handleLeaving}>
          <Row
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={isNext}
            transition={{ type: "tween", duration: 1 }}
          >
            {data?.results
              .slice(1)
              .slice(index * offset, index * offset + offset)
              .map((movie) => (
                <Box
                  layoutId={movie.id + " " + dataName}
                  key={movie.id}
                  bgPhoto={makeImagePath(movie.poster_path, "w300")}
                  variants={boxVariants}
                  initial="normal"
                  whileHover="hover"
                  onClick={(e) => onBoxClick(e, movie.id)}
                >
                  <Info variants={infoVariants}>
                    <h4>{type === "movie" ? movie.title : movie.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      )}
    </Wrapper>
  );
};

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: ${(props) => props.theme.white};
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  height: 200px;
  font-size: 20px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding: 10px;
  background-color: ${(props) => props.theme.black};
  opacity: 0;
  margin-top: 70%;
  width: 100%;
  height: 30%;
  color: ${(props) => props.theme.white};
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const DataTitle = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.white};
  margin-right: 20px;
`;

const DataTitleAndButtonWrapper = styled.div`
  display: flex;
  margin: 0 0 20px 20px;
`;

const NextAndPrevButton = styled.button``;

const Wrapper = styled.div`
  height: 300px;
`;

export default Slider;
