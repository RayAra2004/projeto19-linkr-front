import { styled } from "styled-components";
import { Tooltip } from "react-tooltip";
import { FaEdit, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { Tagify } from "react-tagify";

export default function Post({ post, setPosts }) {
  const [liked, setLiked] = useState(false);
  const { auth } = useAuth();

  console.log(post);

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

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
        )
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

  return (
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
            data-tooltip-content={handleTooltipContent(post)}
            data-tooltip-place="bottom"
          >
            {parseInt(post.likes)} likes
          </h3>
        </LikeDiv>
      </div>
      <ManageButtons>
        <EditIcon>
          <FaEdit color="white" size={20} />
        </EditIcon>
        <DeleteIcon>
          <FaTrash color="white" size={20} />
        </DeleteIcon>
      </ManageButtons>
      <div className="description">
        <h2>{post.username}</h2>
        <span>{post.description}</span>
        <a href={post.metadataUrl.url} target="_blank" rel="noreferrer">
          <div className="url">
            <div className="data">
              <h1>{post.metadataUrl.title}</h1>
              <span>{post.metadataUrl.description}</span>
              <br />
              <a href={post.metadataUrl.url} target="_blank" rel="noreferrer">
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
  );
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
  position: relative;
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
const ManageButtons = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 15px;
  padding-right: 20px;
  padding-top: 15px;
`;
const EditIcon = styled.div`
  cursor: pointer;
`;
const DeleteIcon = styled.div`
  cursor: pointer;
`;
