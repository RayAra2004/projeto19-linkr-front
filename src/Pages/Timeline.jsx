import styled from "styled-components";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import { Context } from "../Contexts/Context";
import Trending from "../Components/Trending";
import PublishPost from "../Components/PublishPost";

export default function Timeline() {
  const [posts, setPosts] = useState(undefined);
  const { setTrendings } = useContext(Context);
  const { auth, user } = useAuth();
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate();
  const [atualizar, setAtualizar] = useState(0);
  const [error, setError] = useState(false);

  

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
        alert("An error occured while trying to fetch the posts, please refresh the page");
      });
  }, [auth, navigate, setTrendings, atualizar]);

  

  if (error) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
        <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar = {atualizar} setAtualizar = {setAtualizar}/>
          <div className="published">
            <p className="loading" data-test="message">
              An error occured while trying to fetch the posts, please refresh the page
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
      </SCTimeline>
    );
  }

  if (posts && posts.length === 0) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar = {atualizar} setAtualizar = {setAtualizar}/>
          <div className="published">
            <p className="loading" data-test="message">
              There are no posts yet
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
      </SCTimeline>
    );
  }

  if (posts === undefined) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar = {atualizar} setAtualizar = {setAtualizar}/>
          <div className="published">
            <p className="loading" data-test="message">
              There are no posts yet
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
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
        <PublishPost atualizar = {atualizar} setAtualizar = {setAtualizar}/>
        <div className="published">
          {posts &&
            posts.map((p) => (
              <Post
                setAtualizar={setAtualizar}
                atualizar={atualizar}
                post={p}
                setPosts={setPosts}
                permission = {user.id === p.userId}
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
  @media (max-width: 375px) {
    margin-top: 100px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

const SCBody = styled.div`
  width: 611px;
  margin-top: 40px;
  @media (max-width: 375px) {
      margin-top: 40px;
      width: 375px;
    }
  .loading {
    color: white;
    font-size: 30px;
    width: 100%;
    text-align: center;
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
    @media (max-width: 375px) {
      margin-left:10px;
      margin-bottom:-15px;
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

  .published {
    margin-top: 40px;

  }
`;
