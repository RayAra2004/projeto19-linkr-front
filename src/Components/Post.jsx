import { styled } from "styled-components"
import { Tooltip } from "react-tooltip"
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { Tagify } from "react-tagify";

export default function Post({post, setPosts}){
    const [liked, setLiked] = useState(false);
    const { auth } = useAuth();
    
    const authorization = {
        headers: {
          Authorization: `Bearer ${auth}`,
        },
      };

    // Pretendo componentizar isso quando eu descobrir como
    const handleLikeClick = (postId) => {
        const alreadyLiked = liked[postId];

        if (alreadyLiked) {
        axios
            .delete(
            `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
            authorization
            ) // Quando o back for deploy, adicionar o link no .env e alterar aqui
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
            .post(
            `${process.env.REACT_APP_API_URL}/posts/${postId}/like`,
            {},
            authorization
            ) // Quando o back for deploy, adicionar o link no .env e alterar aqui
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

    return(
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
                    data-tooltip-content="NÃO SEI" // Preciso real de ajuda com isso, não consigo fazer uma condicional que abrange todas as possibilidades de curtidas
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
                            <span>{post.metadataUrl.description}</span><br/>
                            <a href={post.metadataUrl.url} target="_blank" rel="noreferrer">{post.metadataUrl.url}</a>
                        </div>
                        <div className="image">
                            <img src={post.metadataUrl.image} alt=""/>
                        </div>
                    </div>
                </a>
               
                <Tagify
                  color="#fffff"
                  onClick={(text, type) => console.log(text, type)}
                >

                </Tagify>
              </div>
            </SCPost>
    )
}

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
        .data{
            margin-top: 10px;
            margin-left: 4px;
            display: flex;
            flex-direction: column;

            h1{  
                font-size: 21px;
                line-height: 20px;
                color: rgba(206, 206, 206, 1);
            }

            span{
                font-size: 16px;
                line-height: 13px;
                color: rgba(155, 149, 149, 1);
                
            }

            a{
                font-size: 16px;
                line-height: 13px;
                color: rgba(206, 206, 206, 1);
            }
        }

        .image{
            img{
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
`

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