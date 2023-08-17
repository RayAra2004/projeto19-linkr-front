import { styled } from "styled-components";
import Header from "../Components/Header";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";

export default function Timeline() {
  const [liked, setLiked] = useState(false);
  const [posts, setPosts] = useState([]);

  //Teste para curtir com meu token (Naomi ihihi), quando o login no front utilizar o Auth do Brendo, importar o Auth e usar o Auth com o Bearer
  const authorization = {
    headers: {
      Authorization: "Bearer b947f2dc-3a93-40f2-8c22-f747d847a148",
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/posts`)
      .then((answer) => {
        setPosts(answer.data);
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  // Pretendo componentizar isso quando eu descobrir como
  const handleLikeClick = (postId) => {
    const alreadyLiked = liked[postId];

    if (alreadyLiked) {
      axios
        .delete(`http://localhost:5000/posts/${postId}/like`, authorization) // Quando o back for deploy, adicionar o link no .env e alterar aqui
        .then(() => {
          setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: false,
          }));
          setPosts((prevPosts) => {
            return prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: parseInt(post.likes) - 1 }
                : post
            );
          });
        });
    } else {
      axios
        .post(`http://localhost:5000/posts/${postId}/like`, {}, authorization) // Quando o back for deploy, adicionar o link no .env e alterar aqui
        .then(() => {
          setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: true,
          }));
          setPosts((prevPosts) => {
            return prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: parseInt(post.likes) + 1 }
                : post
            );
          });
        });
    }
  };

  return (
    <SCTimeline>
      <Header />
      <SCBody>
        <div>
          <p>timeline</p>
        </div>
        <div className="publish">
          <div className="user_picture">
            <img src="https://source.unsplash.com/random" alt="" />
          </div>
          <div className="post-confirm">
            <p>What are you going to share today?</p>
            <form>
              <input placeholder="http:// ..." />
              <input placeholder="Awesome article about #javascript" />
              <button>Publish</button>
            </form>
          </div>
        </div>
        <div className="published">
          {/* TODO: Trocar para componente */}
          {posts.map((post) => (
            <SCPost key={post.id} className="post">
              <div className="user">
                <img src={post.picture} alt="" />

                <LikeDiv className="like">
                  <LikeButton onClick={() => handleLikeClick(post.id)}>
                    {liked[post.id] ? (
                      <FaHeart color="red" size={20} />
                    ) : (
                      <FaRegHeart color="white" size={20} />
                    )}
                  </LikeButton>
                  <Tooltip
                    id="my-tooltip"
                    style={{
                      backgroundColor: "white",
                      fontFamily: "Lato",
                      fontSize: "15px",
                      color: "#222",
                      height: "25px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  />
                  <h3
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content={
                      post.likes === 0
                        ? "Ninguém curtiu ainda"
                        : post.likes === 1 && liked
                        ? "Você curtiu"
                        : post.likes === 1
                        ? "Uma pessoa curtiu"
                        : `Curtido por ${post.likes} pessoas`
                        // Ainda falta mais verificações para ficar de acordo com o Figma, preciso de ajuda não tenho ideia
                    }
                    data-tooltip-place="bottom"
                  >
                    {parseInt(post.likes)} likes
                  </h3>
                </LikeDiv>
              </div>
              <div className="description">
                <h2>{post.username}</h2>
                <span>{post.description}</span>
                <div className="url">
                  <span>Oiiiieeeeee preenchendo espaço</span>
                </div>
              </div>
            </SCPost>
          ))}
        </div>
      </SCBody>
    </SCTimeline>
  );
}

const LikeDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    font-size: 12px;
    font-family: "Lato", sans-serif !important;
  }
`;

const LikeButton = styled.div``;

const SCTimeline = styled.div`
  height: 100%;
  margin-top: 72px;
  display: flex;
  justify-content: center;
`;

const SCBody = styled.div`
  width: 611px;
  margin-top: 40px;

  @media (max-width: 611px) {
    width: 100%;
  }

  div:first-child {
    p {
      color: white;
      font-family: "Oswald", sans-serif !important;
      font-family: "Passion One", cursive;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      margin-bottom: 40px;
    }
  }
  .user_picture {
    margin-right: 10px;
    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }

  .publish {
    height: 209px;
    border-radius: 16px;
    background-color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.0625);
    display: flex;
    position: relative;
    padding-top: 1px;

    @media (max-width: 426px) {
      border-radius: 0px;
    }

    div:first-child {
      margin-left: 10px;
      margin-top: 9px;
    }

    .post-confirm {
      p {
        font-family: "Lato", sans-serif !important;
        font-family: "Passion One", cursive;
        color: rgba(112, 112, 112, 1);
        font-size: 20px;
        line-height: 24px;
        font-weight: bold !important;
        margin-top: 10px;
        margin-bottom: 10px;
      }

      form {
        input {
          background-color: rgba(239, 239, 239, 1);
          border: none;
          border-radius: 5px;
          height: 30px;
          width: 503px;
          font-family: "Lato", sans-serif !important;
          font-size: 15px;
          line-height: 18px;
          margin-bottom: 10px;
        }

        @media (max-width: 611px) {
          input {
            width: 100%;
          }
        }

        @media (max-width: 376px) {
          input {
            width: 90%;
          }
        }

        input:nth-child(2) {
          height: 66px;
          vertical-align: text-top;
        }

        button {
          position: absolute;
          right: 18px;
          bottom: 20px;
          width: 112px;
          height: 31px;
          border: none;
          border-radius: 5px;
          background-color: rgba(24, 119, 242, 1);
          color: white;
          font-family: "Lato", sans-serif !important;
          font-size: 16px;
          line-height: 16px;
          text-align: center;
          font-weight: 700 !important;
        }

        @media (max-width: 426px) {
          buttoN {
            right: 35px;
          }
        }

        @media (max-width: 376px) {
          buttoN {
            right: 30px;
          }
        }
      }
    }
  }

  .published {
    margin-top: 40px;
  }
`;

const SCPost = styled.div`
  width: 100%;
  display: flex;
  height: 276px;
  border-radius: 16px;
  background-color: rgba(23, 23, 23, 1);
  color: white;
  padding-top: 1px;

  @media (max-width: 426px) {
    border-radius: 0;
  }

  .user {
    margin-top: 10px;
    margin-left: 20px;
    gap: 20px;
    align-items: center;
    display: flex;
    flex-direction: column;

    h1 {
      margin-left: 10px;
      margin-top: -10px;
      font-size: 19px;
      font-family: "Lato", sans-serif !important;
    }

    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }

  .description {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
    margin-left: 15px;
    span {
      font-family: "Lato", sans-serif !important;
      font-size: 17px;
      line-height: 21px;
      color: rgba(183, 183, 183, 1);
    }
    h2 {
      font-size: 17px;
      font-family: "Lato", sans-serif !important;
    }
  }

  .url {
    border: 1px solid rgba(77, 77, 77, 1);
    border-radius: 16px;
    width: 95%;
  }

  @media (max-width: 426px) {
    .url {
      margin-left: 60px;
      width: 80%;
    }
  }
`;
