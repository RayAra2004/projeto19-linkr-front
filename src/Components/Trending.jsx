import styled from "styled-components";
import { Tagify } from "react-tagify";
import HashtagLink from "./HashtagLink";

export default function Trending({ trendingHashtags }) {
  return (
    <TrendingDiv data-test="trending">
      <p>trending</p>
      <Underline />
      <Tagify color="#fffff" onClick={(text, type) => console.log(text, type)}>
        {trendingHashtags.map((tag, index) => (
          <HashtagLink tag = {tag} index = {index}/>
        ))}
      </Tagify>
    </TrendingDiv>
  );
}

const TrendingDiv = styled.div`
  margin-top: 143px;
  padding: 10px;
  border-radius: 16px;
  height: 406px;
  width: 300px;
  background-color: #171717;
  @media (max-width: 426px) {
      width: 90%;
      margin-top: 10px;
    }
  p {
    padding-left: 15px;
    color: white;
    font-family: "Oswald", sans-serif !important;
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 35px;
    line-height: 64px;
  }
  h2 {
    margin-left: 10px;
    margin-top: 8px;
    font-family: "Lato", sans-serif !important;
    color: white;
    font-size: 23px;
    font-weight: 200 !important;
    letter-spacing: 3px;
  }
`;

const Underline = styled.div`
  width: 100%;
  margin-bottom: 10px;
  height: 1px;
  background-color: #484848;
`;
