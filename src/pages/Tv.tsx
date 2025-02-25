import { useQuery } from "react-query";
import { getAiringTv, getDetail, getOnTheAirTv, getPopularTv, getTopTv, IGetDetail, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { motion, AnimatePresence, useScroll } from "motion/react";
import { useMatch, useNavigate } from "react-router-dom";
import Slider from "../components/Slider";
import { useRecoilValue } from "recoil";
import { clickBoxState } from "../atom";

const base = import.meta.env.BASE_URL;

const Tv = () => {
  const tvMatch = useMatch(`${base}tv/:tvId`);
  const scroll = useScroll();
  const navigate = useNavigate();
  const clickBox = useRecoilValue(clickBoxState);
  const { data: nowMovieData, isLoading: nowMovieIsLoading } = useQuery<IGetMoviesResult>(
    ["tv", "Airing Today"],
    getOnTheAirTv
  );

  const clickedMovie = useQuery<IGetDetail>(
    ["tv", `${tvMatch?.params.tvId || ""}`],
    () => getDetail("tv", tvMatch?.params.tvId + "" || ""),
    { enabled: !!tvMatch }
  );

  console.log(clickedMovie);

  return (
    <Wrapper>
      {nowMovieIsLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner $bgPhoto={makeImagePath(nowMovieData?.results[0].backdrop_path || "")}>
            <Title>{nowMovieData?.results[0].name}</Title>
            <Overview>{nowMovieData?.results[0].overview}</Overview>
          </Banner>
          <Slider getDataApi={getOnTheAirTv} dataName="Latest Shows" type="tv" />
          <Slider getDataApi={getAiringTv} dataName="Airing Today" type="tv" />
          <Slider getDataApi={getPopularTv} dataName="Popular" type="tv" />
          <Slider getDataApi={getTopTv} dataName="Top Rated" type="tv" />
          <AnimatePresence>
            {tvMatch && (
              <>
                <Overlay
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`${base}tv`);
                  }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                ></Overlay>
                <BigMovieInfo layoutId={clickBox} style={{ top: scroll.scrollY.get() + 100 }}>
                  {clickedMovie && (
                    <>
                      <BigMovieInfoImage
                        style={{
                          backgroundImage: `linear-gradient(transparent, black), url(${makeImagePath(
                            clickedMovie.data?.backdrop_path + "",
                            "w500"
                          )})`,
                        }}
                      />
                      <BigMovieInfoTitle>{clickedMovie.data?.name}</BigMovieInfoTitle>
                      <BigMovieInfoDate>{clickedMovie.data?.last_air_date}</BigMovieInfoDate>
                      <BigMovieInfoOverview>{clickedMovie.data?.overview}</BigMovieInfoOverview>
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

const Banner = styled.div<{ $bgPhoto: string }>`
  height: 80vh;
  background-color: ${(props) => props.theme.red};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(${(props) => props.$bgPhoto});
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

const BigMovieInfoDate = styled.h6`
  color: ${(props) => props.theme.white};
  position: relative;
  top: -60px;
  padding-left: 20px;
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

export default Tv;
