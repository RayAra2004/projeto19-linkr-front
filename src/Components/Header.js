import { styled } from "styled-components";

export default function Header() {
  return (
    <SCHeader>
      <h1>linkr</h1>
      <div>
        <ion-icon name="chevron-down-outline"></ion-icon>
        <img src="https://source.unsplash.com/random" alt="" />
      </div>
    </SCHeader>
  );
}

const SCHeader = styled.div`
  border-bottom: 3px white solid;
  background-color: #151515;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  height: 72px;
  width: 100%;
  color: white;

  h1 {
    margin-left: 30px;
    font-weight: 700 !important;
    font-size: 49px;
  }

  div {
    margin-right: 30px;
    display: flex;
    align-items: center;
    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
      margin-left: 5px;
    }

    ion-icon {
      font-size: 30px;
    }
  }
`;
