import axios from "axios";
import { useState } from "react";
import useAuth from "../Contexts/UseAuth";

export default function PublishPost({atualizar, setAtualizar}){
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
        console.log("clicando")
    
        setTextButton("Publishing...");
        setDisabled(true);
    
        axios
          .post(
            `${process.env.REACT_APP_API_URL}/post`,
            { url, description },
            authorization
          )
          .then((res) => {
            console.log(res)
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
        <div data-test="publish-box" className="publish">
            <div className="user_picture">
              <img src={user.picture} alt="" />
            </div>
            <div className="post-confirm">
              <p>What are you going to share today?</p>
              <form onSubmit={publish}>
                <input data-test="link"
                placeholder="http:// ..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={disabled}
                required/>
                <input data-test="description"
                placeholder="Awesome article about #javascript"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}/>
                <button data-test="publish-btn" disabled={disabled}>
                {textButton}
              </button>
              </form>
            </div>
        </div>
    )
}