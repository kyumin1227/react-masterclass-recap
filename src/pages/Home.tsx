import { useQuery } from "react-query";
import { getMovie, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "motion/react";
import React, { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";

const rowVariants = {
  hidden: { x: window.outerWidth + 5 },
  visible: { x: 0 },
  exit: { x: -window.outerWidth - 5 },
};

const boxVariants = {
  normal: { scale: 1 },
  hover: { scale: 1.3, y: -50, transition: { delay: 0.3 } },
};

const infoVariants = {
  hover: { opacity: 1, transition: { delay: 0.3 } },
};

const base = import.meta.env.BASE_URL;

const Home = () => {
  const movieMatch = useMatch(`${base}movie/:movieId`);
  const scroll = useScroll();
  console.log(movieMatch);
  const navigate = useNavigate();
  const { data, isLoading } = useQuery<IGetMoviesResult>(["movies", "nowPlaying"], getMovie);
  console.log(data);
  console.log(isLoading);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const offset = 6;

  const handelBox = () => {
    if (data) {
      if (leaving) return;
      handleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };

  const handleLeaving = () => {
    setLeaving((prev) => !prev);
  };

  const onBoxClick = (e: React.MouseEvent<HTMLDivElement>, movieId: number) => {
    e.stopPropagation();
    navigate(`${base}movie/${movieId}`);
  };

  const clickedMovie =
    movieMatch?.params.movieId && data?.results.find((movie) => movie.id + "" === movieMatch.params.movieId);

  console.log(clickedMovie);

  return (
    <Wrapper onClick={handelBox}>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence initial={false} onExitComplete={handleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(index * offset, index * offset + offset)
                  .map((movie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      bgPhoto={makeImagePath(movie.poster_path, "w300")}
                      variants={boxVariants}
                      initial="normal"
                      whileHover="hover"
                      onClick={(e) => onBoxClick(e, movie.id)}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {movieMatch && (
              <>
                <Overlay
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${base}`);
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovieInfo layoutId={movieMatch.params.movieId} style={{ top: scroll.scrollY.get() + 100 }}>
                  {clickedMovie && (
                    <>
                      <BigMovieInfoImage
                        style={{
                          backgroundImage: `linear-gradient(transparent, black), url(${makeImagePath(
                            clickedMovie.backdrop_path + "",
                            "w500"
                          )})`,
                        }}
                      />
                      <BigMovieInfoTitle>{clickedMovie.title}</BigMovieInfoTitle>
                      <BigMovieInfoOverview>{clickedMovie.overview}</BigMovieInfoOverview>
                    </>
                  )}
                </BigMovieInfo>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div``;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  background-color: ${(props) => props.theme.red};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 68px;
  margin-bottom: 20px;
  color: ${(props) => props.theme.white};
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
  color: ${(props) => props.theme.white};
  line-height: 1.3;
`;

const Slider = styled.div`
  position: relative;
  top: -100px;
`;

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
  position: absolute;
  width: 100%;
  bottom: 0;
  color: ${(props) => props.theme.white};
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const BigMovieInfo = styled(motion.div)`
  width: 40vw;
  height: 80vh;
  position: absolute;
  right: 0;
  left: 0;
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color: ${(props) => props.theme.black};
`;

const BigMovieInfoImage = styled.div`
  width: 100%;
  height: 70%;
  background-size: cover;
  background-position: center center;
`;

const BigMovieInfoTitle = styled.h2`
  font-size: 24px;
  color: ${(props) => props.theme.white};
  position: relative;
  top: -60px;
  padding: 20px;
`;

const BigMovieInfoOverview = styled.p`
  position: relative;
  top: -60px;
  font-size: 14px;
  color: ${(props) => props.theme.white};
  padding: 20px;
  line-height: 1.3;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Home;
