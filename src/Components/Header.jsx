import styled from "styled-components";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import useAuth from "../Contexts/UseAuth";
import { DebounceInput } from "react-debounce-input";
import axios from "axios";
import { ContextSearch } from "../Contexts/SerachBar";

export default function Header() {
  const [openButton, setOpenButton] = useState(false);
  const [search, setSearch] = useState("");
  const { users, setUsers } = useContext(ContextSearch);
  const navigate = useNavigate();
  const { auth } = useAuth();

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  function activeLogout() {
    localStorage.removeItem("auth");
    localStorage.removeItem("user");
    navigate("/");
  }

  function toggleMenu() {
    setOpenButton(!openButton);
  }

  function startSearch(value) {
    if (value.trim().length >= 3) {
      setSearch(value);
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/searchUser`,
          { user: value },
          authorization
        )
        .then((res) => {
          setUsers(res.data);

          console.log(res.data);
        })
        .catch((err) => console.log(err));
    } else {
      setUsers("");
    }
  }

  return (
    <>
      <SCHeader>
        <Link to="/timeline">
          <Logo className="logo">linkr</Logo>
        </Link>
        <BarraPesquisaContainer>
          <DebounceInput
            data-test="search"
            className="input"
            type="text"
            placeholder="Search for people"
            minLength={3}
            debounceTimeout={300}
            value={search}
            onChange={(e) => {
              startSearch(e.target.value);
            }}
          />
          <SearchIcon>
            <FiSearch />
          </SearchIcon>
          <SCResults results={users}>
            {users &&
              users.map((result) => (
                <Link data-test="user-search" to={`/user/${result.id}`}>
                  <SCDivUser key={result.id}>
                    <img src={result.picture} alt={result.username} />
                    <p>{result.username}</p>
                  </SCDivUser>
                </Link>
              ))}
          </SCResults>
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
          <LogoutText>Logout</LogoutText>
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
  a {
    color: white;
    :hover {
      -webkit-transform: scale(1.4);
      transform: scale(1.1);
    }
  }
  .barra {
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

const BarraPesquisaContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;

  .input {
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
  }
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

const SCResults = styled.div`
  position: absolute;
  top: 53px;
  background-color: #e7e7e7;
  width: 369px;
  border-radius: 0px 0px 8px 8px;
  display: ${(props) => {
    if (props.results && props.results.length > 0) {
      return "flex !important";
    } else {
      return "none!important";
    }
  }};
  flex-direction: column;
  padding-left: 20px;
  padding-top: 10px;

  a {
    width: 100%;
  }
`;

const SCDivUser = styled.div`
  width: 100%;
  margin-bottom: 10px;

  img {
    margin-right: 10px;
  }

  p {
    color: black;
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
`;

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

