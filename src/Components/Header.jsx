import { styled } from "styled-components";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from 'react-icons/fi';



export default function Header() {
  const [openButton, setOpenButton] = useState(false);
  const navigate = useNavigate()


  function activeLogout() {
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
    navigate("/");
  }

  function toggleMenu() {
    setOpenButton(!openButton);
  }

  return (
    <>
      <SCHeader>
        <Link to="/timeline">
          <Logo className="logo">linkr</Logo>
        </Link>
        <BarraPesquisaContainer>
          <BarraPesquisa type="text" placeholder="Search for people" />
          <SearchIcon>
            <FiSearch />  {/* aplica a função de pesquisar aqui nesse Icon */}
          </SearchIcon>
        </BarraPesquisaContainer>
        <div className="barra" onClick={toggleMenu}>
          <ion-icon
            name={openButton ? "chevron-up-outline" : "chevron-down-outline"}
          ></ion-icon>
          <img src="https://source.unsplash.com/random" alt="" />
        </div>
      </SCHeader>
      {openButton && (
        <LogoutButton onClick={activeLogout}>
          <LogoutText>
            Logout
          </LogoutText>
        </LogoutButton>
      )}
    </>
  );
}

const SCHeader = styled.div`
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
  a{
    color: white;
    :hover{
    -webkit-transform: scale(1.4);
    transform: scale(1.1);
  }
  }
  .barra{
    position: relative;
  }
  h1 {
    margin-left: 30px;
    font-weight: 700 !important;
    font-size: 49px;
    cursor: pointer;
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
      cursor: pointer;
      &:hover {
    background-color: #fcd3d3; 
    transition: 0.5s;
    opacity: 0.5;
  }
    }
    ion-icon {
      font-size: 30px;
      cursor: pointer;
    }
  }

`;

const BarraPesquisa = styled.input`
    width: 370px;
    height: 50px;
    border-radius: 8px;
    letter-spacing: 0em;
    text-align: left;
    font-family: "Lato", sans-serif !important;
    font-family: "Passion One", cursive;
    font-size: 20px;
    line-height: 24px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 15px;
`
const BarraPesquisaContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const SearchIcon = styled.div`
  position: absolute;
  right: -10px;
  top: 50%;
  transform: translateY(-50%);
  color: #969494;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #333333;
  }
`;


const commonStyle = `
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
  cursor: pointer;
  transition: 0.5s;
  :hover {
    transform: scale(1.3);
  }
`;

const LogoutButton = styled.button`
  position: absolute;
  right: 10px;
  border-radius: 0px 0px 20px 20px;
  background: #171717;

  padding-top: 20px;
  ${commonStyle}
`

const Logo = styled.h1`
  ${commonStyle}
  font-weight: 700 !important;
  font-size: 49px;
  margin-left: 30px;
`;

const LogoutText = styled.h1`
    ${commonStyle}
    width: 150px;
    height: 47px;
    top: 72px;
    font-size: 30px;
    color: #fff;
    letter-spacing: 1px;
`;

