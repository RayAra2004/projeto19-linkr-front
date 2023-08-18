import { styled } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom"


export default function Header() {
  const [openButton, setOpenButton] = useState(false);
  const navigate = useNavigate()
  

  function activeLogout() {
    // Redirecione para a rota de login
    navigate("/");
  }

  function toggleMenu() {
    setOpenButton(!openButton);
  }

  return (
    <>
      <SCHeader>
        <h1>linkr</h1>
        <div onClick={toggleMenu}>
          <ion-icon
            name={openButton ? "chevron-up-outline" : "chevron-down-outline"}
          ></ion-icon>
          <img src="https://source.unsplash.com/random" alt="" />
        </div>
      </SCHeader>
      {openButton && (
        <LogoutButton onClick={activeLogout}>
          <button>Logout</button>
        </LogoutButton>
      )}
    </>
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

const LogoutButton = styled.div`

button {
  width: 150px;
  height: 47px;
  top: 72px;
  left: 1307px;
  border-radius: 0px 0px 20px 20px;
  background: #171717;
  font-size: 30px;
  color: #fff;
  letter-spacing: 1px;
  
}

`;



