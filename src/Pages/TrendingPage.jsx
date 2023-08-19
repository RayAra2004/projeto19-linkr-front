import { styled } from "styled-components";
import Header from "../Components/Header";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext, useEffect, useState } from "react";
import { Tooltip } from "react-tooltip";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { Tagify } from "react-tagify";
import { useNavigate, useParams } from "react-router-dom";
import { Context } from "../Contexts/Context";
import { Link } from "react-router-dom";

export default function TrendingPage() {
  const { trendings } = useContext(Context);
  const [liked, setLiked] = useState({});
  const [posts, setPosts] = useState(undefined);
  const [controle] = useState(0);
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { hashtag } = useParams();

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  useEffect(() => {
    if (!auth) {
      navigate("/");
      alert("Faça o Login!");
      return;
    }

    axios
      .get(`${process.env.REACT_APP_API_URL}/hashtag/${hashtag}`)
      .then((answer) => {
        const postsWithLikedStatus = answer.data.map((post) => ({
          ...post,
          liked: post.likedUsers.includes(auth),
        }));
        setPosts(postsWithLikedStatus);
      })
      .catch((error) => {
        alert(
          "An error occurred while trying to fetch the posts, please refresh the page"
        );
      });
  }, [hashtag, auth, controle, navigate]);

  const handleLikeClick = (postId) => {
    const alreadyLiked = liked[postId];

    if (alreadyLiked) {
      axios
        .delete(
          `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
          authorization
        )
        .then(() => {
          setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: false,
          }));
          setPosts((prevPosts) => {
            return prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: parseInt(post.likes) - 1, liked: false }
                : post
            );
          });
        });
    } else {
      axios
        .post(
          `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
          {},
          authorization
        )
        .then(() => {
          setLiked((prevLiked) => ({
            ...prevLiked,
            [postId]: true,
          }));
          setPosts((prevPosts) => {
            return prevPosts.map((post) =>
              post.id === postId
                ? { ...post, likes: parseInt(post.likes) + 1, liked: true }
                : post
            );
          });
        });
    }
  };

  const handleTooltipContent = (post) => {
    const totalLikes = parseInt(post.likes);
    const totalPeople = totalLikes - (liked[post.id] ? 1 : 0);

    if (totalLikes === 0) {
      return "Ninguém curtiu";
    } else if (totalLikes === 1 && liked[post.id]) {
      return "Você curtiu";
    } else if (totalLikes === 1) {
      return `${post.likedUsers[0]} curtiu`;
    } else if (liked[post.id]) {
      return `Você, ${totalPeople} outras pessoas`;
    } else if (totalLikes === 2) {
      return `${post.likedUsers[0]} e ${post.likedUsers[1]} curtiram`;
    } else {
      return `${post.likedUsers[0]}, ${post.likedUsers[1]}, e ${
        totalPeople - 2
      } outras pessoas`;
    }
  };

  if (posts && posts.length === 0) {
    alert("There are no posts yet");
  }

  if (posts === undefined) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p># {hashtag}</p>
          </div>

          <div className="published">
            <p className="loading">Loading</p>
          </div>
        </SCBody>
      </SCTimeline>
    );
  }

  return (
    <SCTimeline>
      <Header />
      <SCBody>
        <div className="timeline">
          <p># {hashtag}</p>
        </div>
        <div className="published">
          {posts.map((post) => (
            <SCPost key={post.id} className="post">
              <div className="user">
                <img src={post.picture} alt="" />

                <LikeDiv className="like">
                  <LikeButton onClick={() => handleLikeClick(post.id)}>
                    {post.liked ? ( // Verifica o estado liked do post
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
                    data-tooltip-content={handleTooltipContent(post)}
                    data-tooltip-place="bottom"
                  >
                    {parseInt(post.likes)} likes
                  </h3>
                </LikeDiv>
              </div>
              <div className="description">
                <h2>{post.username}</h2>
                <span>{post.description}</span>
                <a href={post.metadataUrl.url} target="_blank" rel="noreferrer">
                  <div className="url">
                    <div className="data">
                      <h1>{post.metadataUrl.title}</h1>
                      <span>{post.metadataUrl.description}</span>
                      <br />
                      <a
                        href={post.metadataUrl.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {post.metadataUrl.url}
                      </a>
                    </div>
                    <div className="image">
                      <img src={post.metadataUrl.image} alt="" />
                    </div>
                  </div>
                </a>
                <Tagify
                  color="#fffff"
                  onClick={(text, type) => console.log(text, type)}
                ></Tagify>
              </div>
            </SCPost>
          ))}
        </div>
      </SCBody>
      <Trending>
        <p>trending</p>
        <Underline />
        <Tagify
          color="#fffff"
          onClick={(text, type) => console.log(text, type)}
        >
          {trendings.map((tag, index) => (
            <Link to={`/hashtag/${tag.replace("#", "")}`}>
              <h2 key={index}>{tag}</h2>
            </Link>
          ))}
        </Tagify>
      </Trending>
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

const Underline = styled.div`
  width: 100%;
  margin-bottom: 10px;
  height: 1px;
  background-color: #484848;
`;

const Trending = styled.div`
  margin-top: 143px;
  border-radius: 16px;
  height: 406px;
  width: 300px;
  background-color: #171717;
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
    margin-top: 5px;
    font-family: "Lato", sans-serif !important;
    color: white;
    font-size: 23px;
    font-weight: 200 !important;
    letter-spacing: 3px;
  }
`;

const LikeButton = styled.div``;

const SCTimeline = styled.div`
  height: 100%;
  margin-top: 72px;
  display: flex;
  gap: 30px;
  justify-content: center;
  background-color: rgba(51, 51, 51, 1);
`;

const SCBody = styled.div`
  width: 611px;
  margin-top: 40px;

  .loading {
    color: white;
    font-size: 30px;
    width: 100%;
    text-align: center;
  }

  @media (max-width: 611px) {
    width: 100%;
  }

  .timeline {
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
  min-height: 206px;
  border-radius: 16px;
  background-color: rgba(23, 23, 23, 1);
  color: white;
  padding-top: 1px;
  margin-bottom: 20px;

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
    margin-bottom: 10px;

    span {
      h3 {
        font-family: "Lato", sans-serif !important;
        font-size: 17px;
        line-height: 21px;
        color: rgba(183, 183, 183, 1);
      }
      h2 {
        font-size: 17px;
        font-family: "Lato", sans-serif !important;
      }
      span {
        color: white;
        font-size: 18px;
      }
    }

    .url {
      border: 1px solid rgba(77, 77, 77, 1);
      border-radius: 16px;
      max-width: 95%;
      min-height: 92px;
      display: flex;
      font-family: "Lato", sans-serif !important;
      font-weight: 400;
      .data {
        margin-top: 10px;
        margin-left: 4px;
        display: flex;
        flex-direction: column;

        h1 {
          font-size: 21px;
          line-height: 20px;
          color: rgba(206, 206, 206, 1);
        }

        span {
          font-size: 16px;
          line-height: 13px;
          color: rgba(155, 149, 149, 1);
        }

        a {
          font-size: 16px;
          line-height: 13px;
          color: rgba(206, 206, 206, 1);
        }
      }

      .image {
        img {
          width: 154px;
          max-height: 155px;
          border-radius: 0px 12px 13px 0px;
        }
      }
    }

    @media (max-width: 426px) {
      .url {
        margin-left: 60px;
        width: 80%;
      }
    }
  }
`;
