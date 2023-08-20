import styled from "styled-components";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import { Context } from "../Contexts/Context";
import Trending from "../Components/Trending";

export default function Timeline() {
  const [posts, setPosts] = useState(undefined);
  const { setTrendings } = useContext(Context);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [textButton, setTextButton] = useState("Publish");
  const [disabled, setDisabled] = useState(false);
  const { auth } = useAuth();
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate();
  const [atualizar, setAtualizar] = useState(0);
  const [error, setError] = useState(false);

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
    console.log("atualizando pagina... kk");

    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then((answer) => {
        setPosts(answer.data);
        const hashtagCount = {};
        answer.data.forEach((post) => {
          const hashtags = post.description.match(/#\w+/g);
          if (hashtags) {
            hashtags.forEach((tag) => {
              if (hashtagCount[tag]) {
                hashtagCount[tag]++;
              } else {
                hashtagCount[tag] = 1;
              }
            });
          }
        });

        const sortedHashtags = Object.keys(hashtagCount).sort(
          (a, b) => hashtagCount[b] - hashtagCount[a]
        );

        setTrendingHashtags(sortedHashtags.slice(0, 10));
        setTrendings(sortedHashtags.slice(0, 10));
      })
      .catch((error) => {
        setError(true);
      });
  }, [auth, navigate, setTrendings, atualizar]);

  function publish(e) {
    e.preventDefault();

    setTextButton("Publishing...");
    setDisabled(true);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        { url, description },
        authorization
      )
      .then((res) => {
        setDescription("");
        setUrl("");
        setTextButton("Publish");
        setDisabled(false);
        setAtualizar(atualizar + 1);
      })
      .catch((err) => {
        alert("Houve um erro ao publicar seu link");
        setTextButton("Publish");
        setDisabled(false);
      });
  }

  if(error){
    return(
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
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
                <button>{textButton}</button>
              </form>
            </div>
          </div>
          <div className="published">
            <p className="loading">An error occured while trying to fetch the posts, please refresh the page</p>
          </div>
        </SCBody>
      </SCTimeline>
    )
  }

  if (posts && posts.length === 0) {
    return(
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
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
                <button>{textButton}</button>
              </form>
            </div>
          </div>
          <div className="published">
            <p className="loading" data-test="message" >There are no posts yet</p>
          </div>
        </SCBody>
      </SCTimeline>
    )
  }

  if (posts === undefined) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
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
                <button>{textButton}</button>
              </form>
            </div>
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
          <p>timeline</p>
        </div>
        <div data-test="publish-box" className="publish">
          <div className="user_picture">
            <img src="https://source.unsplash.com/random" alt="" />
          </div>
          <div className="post-confirm">
            <p>What are you going to share today?</p>
            <form onSubmit={(e) => publish(e)}>
              <input
                data-test="link"
                placeholder="http:// ..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={disabled}
                required
              />
              <input
                data-test="description"
                placeholder="Awesome article about #javascript"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
              />
              <button data-test="publish-btn" {...disabled}>
                {textButton}
              </button>
            </form>
          </div>
        </div>
        <div className="published">
          {/* TODO: Trocar para componente */}
          {posts &&
            posts.map((p) => (
              <Post
                setAtualizar={setAtualizar}
                atualizar={atualizar}
                post={p}
                setPosts={setPosts}
                url={url}
              />
            ))}
        </div>
      </SCBody>
      <Trending trendingHashtags={trendingHashtags} />
    </SCTimeline>
  );
}

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
