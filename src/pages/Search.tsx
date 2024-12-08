import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { getSearch } from "../api";
import SearchSlider from "../components/SearchSlider";
import styled from "styled-components";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log(location);

  console.log(keyword);

  const { data, isLoading } = useQuery(["search", `${keyword}`], () => getSearch(keyword || ""));

  console.log(data);

  return (
    <>
      <SearchWrapper>
        <SearchTotal>Total Result: {data?.total_results}</SearchTotal>
        <SearchSlider dataName={keyword || ""} data={data} isLoading={isLoading} />
      </SearchWrapper>
    </>
  );
};

const SearchWrapper = styled.div`
  margin-top: 100px;
`;

const SearchTotal = styled.h2`
  color: ${(props) => props.theme.white};
  font-size: 24px;
  margin-left: 20px;
  margin-bottom: 20px;
`;

export default Search;
