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
import { useInterval } from "use-interval";
import { HiRefresh } from "react-icons/hi";
import InfiniteScroll from "react-infinite-scroller";

export default function Timeline() {
  const [posts, setPosts] = useState(undefined);
  const { setTrendings } = useContext(Context);
  const { auth, user } = useAuth();
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate();
  const { atualizar, setAtualizar } = useContext(Context);
  const [error, setError] = useState(false);
  const [follower, setFollower] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [newPosts, setNewPosts] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [countNewPosts, setCountNewPosts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMorePosts, setHasMorePosts] = useState(true);

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
    params:{
      page: currentPage
    }
  };

  useInterval(() => {
    const authorization = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    }
    axios.get(`${process.env.REACT_APP_API_URL}/posts/refresh`, authorization)
      .then(res => {
        setNewPosts(res.data.response);
        const a1 = [...posts];
        const a2 = res.data.response;
        console.log("Interval");
        if (JSON.stringify(a1) !== JSON.stringify(a2)) {
          console.log(a1, a2);
          if (a2.length > a1.length) {
            setCountNewPosts(a2.length - a1.length);
            console.log(countNewPosts);
          } else {
            let count = 0;
            const verifyA1 = a1.map((e) => e.id);
            const verifyA2 = a2.map((e) => e.id);
            console.log(verifyA1, verifyA2);
            for (let i = 0; i < verifyA2.length; i++) {
              if (verifyA2.includes(verifyA1[i])) {
                count++;
                console.log(count);
              }
            }
            setCountNewPosts(a2.length - count);
          }
        }
      })
      .catch((err) => {
        console.log(err);
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, 15000);

  useEffect(() => {
    if (!auth) {
      navigate("/");
      alert("Faça o Login!");
      return;
    }
    console.log("atualizando pagina... kk");
    if (refresh) {
      axios
        .get(`${process.env.REACT_APP_API_URL}/posts`, authorization)
        .then((answer) => {
          setPosts(answer.data.response);
          setFollower(answer.data.follower);
          const hashtagCount = {};
          answer.data.response.forEach((post) => {
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
          setRefresh(false);
          setCountNewPosts(0);
        })
        .catch((error) => {
          setError(true);
          console.log(error);
          alert(
            "An error occured while trying to fetch the posts, please refresh the page"
          );
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth, navigate, setTrendings, atualizar]);

  function refreshPage() {
    setRefresh(true);
    setCountNewPosts(0);
    setAtualizar(atualizar + 1);
    setCurrentPage(1);
  }

  function loadPage(page) {
    if (!hasMorePosts) {
      return; // Não carregar mais posts se não houver mais disponíveis
    }

    axios.get(`${process.env.REACT_APP_API_URL}/posts`, {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
      params: {
        page: page,
      },
    })
      .then((response) => {
        const newPosts = response.data.response;

        if (newPosts.length === 0) {
          setHasMorePosts(false); // Marcar que não há mais posts disponíveis
          return;
        }

        // Atualiza o estado das postagens e o número da página atual
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setCurrentPage(page + 1);
        console.log(page + 1)
      })
      .catch((error) => {
        console.log(error);
        alert("An error occurred while trying to fetch the posts, please refresh the page");
      });
  }

  if (error) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar={atualizar} setAtualizar={setAtualizar} />
          <div className="published">
            <p className="loading" data-test="message">
              An error occured while trying to fetch the posts, please refresh
              the page
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
      </SCTimeline>
    );
  }

  if (!follower && posts && posts.length === 0) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar={atualizar} setAtualizar={setAtualizar} />
          <div className="published">
            <p className="loading" data-test="message">
              You don't follow anyone yet. Search for new friends!
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
      </SCTimeline>
    );
  }

  if (follower && posts && posts.length === 0) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar={atualizar} setAtualizar={setAtualizar} />
          <div className="published">
            <p className="loading" data-test="message">
              No posts found from your friends
            </p>
          </div>
        </SCBody>
        <Trending trendingHashtags={trendingHashtags} />
      </SCTimeline>
    );
  }

  if ((posts && posts.length === 0) || posts === undefined) {
    return (
      <SCTimeline>
        <Header />
        <SCBody>
          <div className="timeline">
            <p>timeline</p>
          </div>
          <PublishPost atualizar={atualizar} setAtualizar={setAtualizar} />
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
        <PublishPost atualizar={atualizar} setAtualizar={setAtualizar} />
        {countNewPosts > 0 ? (
          <SCRefresh onClick={() => refreshPage()}>
            <p>Você possui {countNewPosts} novos posts</p> <HiRefresh />{" "}
          </SCRefresh>
        ) : (
          <></>
        )}
        <InfiniteScroll
              pageStart={1}
              loadMore={loadPage}
              hasMore={hasMorePosts}
              loader={<div className="loader" key={0}>Loading...</div>}
        >
          <div className="published">
            {posts &&
              posts.map((p) => (
                <Post
                  setAtualizar={setAtualizar}
                  atualizar={atualizar}
                  post={p}
                  setPosts={setPosts}
                  permission={user.id === p.userId}
                />
              ))}
          </div>
        </InfiniteScroll>
      </SCBody>
      <Trending trendingHashtags={trendingHashtags} />
    </SCTimeline>
  );
}

const SCLoaderPage = styled.div`
  position: fixed;
  bottom: 0;
  left: 30px;
`

const SCTimeline = styled.div`
  height: 100%;
  margin-top: 72px;
  display: flex;
  gap: 30px;
  justify-content: center;
  background-color: rgba(51, 51, 51, 1);
  @media (max-width: 426px) {
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
  @media (max-width: 426px) {
    margin-top: 40px;
    width: 100%;
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
      font-weight: 700 !important;
      font-size: 43px;
      line-height: 64px;
      margin-bottom: 40px;
    }
    @media (max-width: 426px) {
      margin-left: 10px;
      margin-bottom: -15px;
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
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-top: 40px;
  }
`;

const SCRefresh = styled.div`
  margin-top: 20px;
  margin-bottom: 10px;
  width: 100%;
  height: 61px;
  border-radius: 16px;
  box-shadow: 0px 4px 4px 0px;
  background-color: #1877f2;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  p {
    text-align: center;
    font-size: 16px;
    line-height: 19px;
    font-weight: 400;
    font-family: "Lato", sans-serif !important;
    color: white;
    margin-right: 10px;
  }

  svg {
    color: white;
  }
`;
