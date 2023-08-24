import styled from "styled-components";
import useAuth from "../Contexts/UseAuth";
import { IoPaperPlaneOutline as SendButton } from "react-icons/io5";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { Context } from "../Contexts/Context";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Comments({
  postId,
  userId,
  commentsCount,
  onUpdateCommentsCount,
}) {
  console.log(postId);
  const { atualizar, setAtualizar } = useContext(Context);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { user, auth } = useAuth();

  useEffect(() => {
    if (!auth) {
      navigate("/");
      alert("Faça o Login!");
      return;
    }

    const authorization = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    axios

      .get(`${process.env.REACT_APP_API_URL}/comments/${postId}`, authorization)
      .then((answer) => {
        setComments(answer.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  }, [atualizar, auth, navigate, postId]);

  function postComment() {
    const authorization = {
      headers: {
        Authorization: `Bearer ${auth}`,
      },
    };

    const sendComment = {
      comment: comment,
      postId: postId,
    };

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/comments/`,
        sendComment,
        authorization
      )
      .then(() => {
        setComment("");
        onUpdateCommentsCount(commentsCount + 1);
        setAtualizar(atualizar + 1);
        console.log(commentsCount);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <CommentsContainer>
      {loading ? (
        <LoadingInfo>Loading comments...</LoadingInfo>
      ) : (
        <CommentsList>
          {comments.map((comment) => (
            <>
              <Comment key={comment.id}>
                <img src={comment.picture} alt={comment.username} />
                <InfoComment>
                  <InfoUser>
                    <p>{comment.username}</p>
                    {comment.userId === userId && <h2>• post’s author</h2>}
                    {comment.isFollowing === true && <h2>• following</h2>}
                  </InfoUser>
                  <span>{comment.comment}</span>
                </InfoComment>
              </Comment>
              <Underline />
            </>
          ))}
        </CommentsList>
      )}
      <UserComment>
        <img src={user.picture} alt={user.username} />
        <form onSubmit={postComment}>
          <CommentInput
            type="text"
            value={comment}
            required
            onChange={(e) => setComment(e.target.value)}
            placeholder="write a comment..."
          />
          <SendDiv>
            <SendButton type="submit" onClick={postComment} />
          </SendDiv>
        </form>
      </UserComment>
    </CommentsContainer>
  );
}

const InfoUser = styled.div`
  display: flex;
  h2 {
    margin-left: 5px;
    font-family: "Lato", sans-serif !important;
    font-size: 14px;
    color: #565656;
    font-weight: 400 !important;
  }
`;

const LoadingInfo = styled.p`
  align-self: center;
  color: white;
  font-size: 15px;
`;
const InfoComment = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  gap: 5px;
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  display: flex;
  gap: 5px;
  margin-top: 10px;
  margin-bottom: 15px;
  p {
    font-family: "Lato", sans-serif !important;
    font-size: 14px;
    color: white;
    font-weight: 700 !important;
  }
  span {
    font-family: "Lato", sans-serif !important;
    color: #acacac;
    font-size: 14px;
    font-weight: 400 !important;
  }
  img {
    width: 39px;
    height: 39px;
  }
`;

const Underline = styled.div`
  width: 93%;
  align-self: center;
  margin-bottom: 10px;
  height: 1px;
  background-color: #484848;
`;

const CommentInput = styled.input`
  margin-left: 20px;
  background-color: #252525;
  border: none;
  border-radius: 10px;
  width: 500px;
  height: 39px;
  padding-right: 40px;
  padding-left: 10px;
  color: white;
  ::placeholder {
    font-style: italic;
    font-family: "Lato", sans-serif;
  }
`;

const SendDiv = styled.div`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
  svg {
    margin-right: 10px;
    font-size: 22px;
    color: white;
  }
`;

const UserComment = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  position: relative;
  input {
    margin-left: 20px;
    background-color: #252525;
    border: none;
    border-radius: 10px;
    width: 500px;
    height: 39px;
  }
`;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: -25px;
  z-index: 1;
  padding-top: 25px;
  padding-bottom: 10px;
  position: relative;
  width: 100%;
  border-radius: 16px;
  background-color: #1e1e1e;
  img {
    border-radius: 50%;
    height: 39px;
    margin-left: 25px;
    cursor: pointer;
    &:hover {
      background-color: #fcd3d3;
      transition: 0.5s;
      opacity: 0.5;
    }
  }
`;
