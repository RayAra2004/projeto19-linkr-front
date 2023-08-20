import styled from "styled-components";
import { Tooltip } from "react-tooltip";
import { FaEdit, FaHeart, FaRegHeart, FaTrash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { Tagify } from "react-tagify";
import { Link } from "react-router-dom";

export default function Post({ post, setPosts, atualizar, setAtualizar, permission }) {
  const [liked, setLiked] = useState(false);
  const { auth, user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newDescription, setNewDescription] = useState(post.description);
  const descriptionInputRef = useRef(null);


  useEffect(() => {
    if (openEdit) {
      descriptionInputRef.current.focus(); // Focar quando a edição é ativada
    }
  }, [openEdit]);

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  function editPost() {
    if (openEdit === true) {
      setOpenEdit(false);
    } else {
      setOpenEdit(true);
    }
  }
  function deletePost() {
    setShowDeleteModal((prevShowDeleteModal) => !prevShowDeleteModal);
  }

  function sendEdit(e, postId) {
    const body = {
      description: newDescription,
    };

    if (e.key === "Enter" || e.keyCode === 13) {
      axios
        .put(
          `${process.env.REACT_APP_API_URL}/post/edit/${postId}`,
          body,
          authorization
        )
        .then((answer) => {

          setAtualizar(atualizar + 1);
          setOpenEdit(false);
        })
        .catch((error) => {
          alert("Erro ao Editar o Post!");
          console.log(error.message);
        });
    }
    if (e.key === "Escape" || e.keyCode === 27) {
      setOpenEdit(false);
    }
  }
  function deleteConfirmation(postId) {
    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/post/delete/${postId}`,
        authorization
      )
      .then((answer) => {
        console.log(`Post ${postId} excluído`);
        setAtualizar(atualizar + 1);
        setShowDeleteModal(false); // Fechar o modal após a exclusão
      })
      .catch((error) => {
        alert("Erro ao Editar o Post!");
        console.log(error.message);
      });
  }

  const handleLikeClick = (postId, oldLiked) => {
    const alreadyLiked = liked[postId];

    if (alreadyLiked || oldLiked) {
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
      setAtualizar(atualizar + 1);
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
      return `${returnMe(post.likedUsers[0])} curtiu`;
    } else if (totalLikes === 2) {
      return `${returnMe(post.likedUsers[0])} e ${post.likedUsers[1]} curtiram`;
    } else {
      return `${returnMe(post.likedUsers[0])}, ${post.likedUsers[1]}, e ${
        totalPeople - 2
      } outras pessoas`;
    }
  };

  function returnMe(postLikedUser) {
    if (postLikedUser === user.username) {
      return "Você";
    }
    return postLikedUser;
  }


  return (
    <SCPost key={post.id} data-test="post" className="post">
      <div className="user">
        <img src={post.picture} alt="" />
        <LikeDiv className="like">
          <LikeButton
            data-test="like-btn"
            onClick={() =>
              handleLikeClick(post.id, post.likedUsers.includes(user.username))
            }
          >
            {liked[post.id] || post.likedUsers.includes(user.username) ? (
              <FaHeart color="red" size={20} />
            ) : (
              <FaRegHeart color="white" size={20} />
            )}
          </LikeButton>
          <Tooltip
            data-test="tooltip"
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
            data-test="counter"
            data-tooltip-id="my-tooltip"
            data-tooltip-content={handleTooltipContent(post)}
            data-tooltip-place="bottom"
          >
            {parseInt(post.likes)} likes
          </h3>
        </LikeDiv>
      </div>
      { permission ? (
        <ManageButtons>
          <EditIcon>
            <FaEdit
              data-test="edit-btn"
              onClick={editPost}
              color="white"
              size={20}
            />
          </EditIcon>
          <DeleteIcon>
            <FaTrash
              data-test="delete-btn"
              onClick={deletePost}
              color="white"
              size={20}
            />
          </DeleteIcon>
        </ManageButtons>
      ) : <></>}
      
      <div className="description">
        <Link to={`/user/${post.userId}`} data-test="username">
          <h2>{post.username}</h2>
        </Link>
        {openEdit === true ? (
          <input
            data-test="edit-input"
            ref={descriptionInputRef}
            defaultValue={post.description}
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            onKeyDown={(e) => {
              sendEdit(e, post.id);
            }}
            type="text"
          />
        ) : (
          <span data-test="description">{post.description}</span>
        )}
        <a
          data-test="link"
          href={post.metadataUrl.url}
          target="_blank"
          rel="noreferrer"
        >
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
      {showDeleteModal && (
        <DeleteModal>
          <DeleteContent>
            <p>Are you sure you want to delete this post?</p>
            <button
              className="cancelar"
              onClick={() => setShowDeleteModal(false)}
            >
              No, go back
            </button>
            <button
              className="deletar"
              onClick={() => deleteConfirmation(post.id)}
            >
              Yes, delete it
            </button>
          </DeleteContent>
        </DeleteModal>
      )}
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

    a{
      color: white;
    }

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
  padding-top: 5px;
`;
const EditIcon = styled.div`
  cursor: pointer;
`;
const DeleteIcon = styled.div`
  cursor: pointer;
`;
const DeleteModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(
    255,
    255,
    255,
    0.7
  ); /* Fundo branco com transparência */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteContent = styled.div`
  background-color: #333333;
  padding: 20px;
  width: 597px;
  height: 172px;
  border-radius: 50px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  text-align: center;

  p {
    margin-bottom: 15px;
    font-family: Lato;
    font-size: 34px;
    font-weight: 300;
    line-height: 41px;
    letter-spacing: 0em;
    text-align: center;
  }

  .cancelar {
    margin: 0 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: white;
    color: #007bff; /* Azul */
  }

  .deletar {
    margin: 0 10px;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff; /* Azul */
    color: white;
  }
`;
