import axios from "axios";
import { useState } from "react";
import useAuth from "../Contexts/UseAuth";
import styled from "styled-components";

export default function PublishPost({ atualizar, setAtualizar }) {
  const [textButton, setTextButton] = useState("Publish");
  const [disabled, setDisabled] = useState(false);
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const { auth, user } = useAuth();

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  function publish(e) {
    e.preventDefault();
    console.log("clicando");

    setTextButton("Publishing...");
    setDisabled(true);

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/post`,
        { url, description },
        authorization
      )
      .then((res) => {
        console.log(res);
        setDescription("");
        setUrl("");
        setTextButton("Publish");
        setDisabled(false);
        setAtualizar(atualizar + 1);
      })
      .catch((err) => {
        alert("There was an error publishing your link");
        setTextButton("Publish");
        setDisabled(false);
      });
  }

  return (
    <DivPublish>
      <div data-test="publish-box" className="publish">
        <div className="user_picture">
          <img src={user.picture} alt="" />
        </div>
        <div className="post-confirm">
          <p>What are you going to share today?</p>
          <form onSubmit={publish}>
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
            <button data-test="publish-btn" disabled={disabled}>
              {textButton}
            </button>
          </form>
        </div>
      </div>
    </DivPublish>
  );
}
const DivPublish = styled.div`
  .publish {
    width: 100%;
    height: 300px; /* Adjusted to allow content to determine height */
    border-radius: 16px;
    background-color: white;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.0625);
    display: flex;
    flex-direction: column; /* Stacking elements in a column */
    position: relative;
    padding: 20px;
    @media (max-width: 426px) {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 0;
      padding: 10px;
      height: 250px;
    }
    .user_picture{
      @media (max-width: 426px) {
      display: none;
    }
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
          width: 100%;
          font-family: "Lato", sans-serif !important;
          font-size: 15px;
          line-height: 18px;
          margin-bottom: 10px;
          @media (max-width: 426px) {
          width: 100%; /* Full width for mobile */
        }
        }
        input:nth-child(2) {
          height: 66px;
          vertical-align: text-top;
        }
        button {
          position: absolute;
          bottom: 15px;
          right: 20px;
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
          @media (max-width: 426px) {
          position: static; /* Remove absolute positioning */
          margin-top: 10px; /* Add margin for spacing */
          width: 130px; /* Full width for mobile */
          margin-left: 63%;
        }
        }
        @media (max-width: 426px) {
        
          margin-top: 10px; /* Add margin for spacing */
      }
      }
      @media (max-width: 426px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    }@media (max-width: 426px) {
      div:first-child {
        margin: 0 auto; /* Center user picture horizontally */
      }
    }
  }
`;
