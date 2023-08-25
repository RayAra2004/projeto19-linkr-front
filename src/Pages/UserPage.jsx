import Header from "../Components/Header";
import Post from "../Components/Post";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../Contexts/Context";
import { useParams } from "react-router-dom";
import useAuth from "../Contexts/UseAuth";
import Trending from "../Components/Trending";
import styled from "styled-components";

export default function UserPage(){
  const [posts, setPosts] = useState([]);
  const { setTrendings } = useContext(Context);
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const { auth } = useAuth();
  const { id } = useParams();
  const [isFollower, setIsFollower] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
    
  useEffect(() =>{
   
      axios
      .get(`${process.env.REACT_APP_API_URL}/posts/${id}`, authorization)
      .then((answer) => {
          console.log(answer.data)
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
          console.log(error)
      });

      axios.get(`${process.env.REACT_APP_API_URL}/isFollower/${id}`, authorization)
        .then(res => setIsFollower(res.data.isFollower))
        .catch(err => console.log(err.message))
  }, [id, setTrendings, auth, isFollower])

  function follow(){
    setDisabled(true)
    if(isFollower){
      axios.delete(`${process.env.REACT_APP_API_URL}/follow/${id}`, authorization)
        .then(res => {
          setIsFollower(false);
          setDisabled(false);
        })
        .catch(err => console.log(err.message))
    }else{
      axios.post(`${process.env.REACT_APP_API_URL}/follow/${id}`,{}, authorization)
        .then(res => {
          setIsFollower(true);
          setDisabled(false);
        })
        .catch(err => console.log(err.message))
    }
  }
    
  if(posts){
    return(
      <SCTimeline>
          <Header/>
          <SCBody>
          <div className="timeline">
              {posts && posts.length > 0 ?(
                  <>
                    <img src={posts[0].picture} alt=""/>
                    <p>{posts[0].username}'s posts</p>
                    {isFollower ? (
                      <button data-test="follow-btn" onClick={() => follow()} disabled = {disabled}>Unfollow</button>
                    ): (
                      <button data-test="follow-btn" onClick={() => follow()} disabled = {disabled}>Follow</button>)}
                  </>
                ): <></>
              }
          </div>
          <div className="published">
              {posts &&
                  posts.map((p) => (
                  <Post
                      post={p}
                      setPosts={setPosts}
                      permission = {false}
                  />
              ))}
          </div>
          </SCBody>
          <Trending trendingHashtags={trendingHashtags}/>
      </SCTimeline>
  )
  }

  
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

  @media (max-width: 611px) {
    width: 100%;
  }

  .timeline {
    display: flex;
    align-items: center;
    gap: 15px;
    p {
      color: white;
      font-family: "Oswald", sans-serif !important;
      font-family: "Passion One", cursive;
      font-weight: 700;
      font-size: 43px;
      line-height: 64px;
      margin-bottom: 10px;
    }

    img{
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
  }

  .published {
    margin-top: 40px;
  }
`;