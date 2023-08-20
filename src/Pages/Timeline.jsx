import { styled } from "styled-components";
import Header from "../Components/Header";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../Contexts/UseAuth";
import { Tagify } from "react-tagify";
import { useNavigate } from "react-router-dom";
import Post from "../Components/Post";
import { Link} from "react-router-dom";
import { Context } from "../Contexts/Context";


export default function Timeline() {
  const [posts, setPosts] = useState(undefined);
  const { setTrendings } = useContext(Context);
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");
  const [textButton, setTextButton] = useState("Publish");
  const [disabled, setDisabled] = useState(false);
  const [controle, setControle] = useState(0);
  const { auth } = useAuth();
  // Estado para armazenar as tendências
  const [trendingHashtags, setTrendingHashtags] = useState([]);
  const navigate = useNavigate();

  const authorization = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  useEffect(() => {

    console.log('oooiiiiiii')

    if(!auth){
      navigate('/')
      alert("Faça o Login!")
      return
    }
  
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
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, [auth, navigate, setTrendings]);
  
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
        setControle(controle + 1);
      })
      .catch((err) => {
        alert("Houve um erro ao publicar seu link");
        setTextButton("Publish");
        setDisabled(false);
      });
  }

  if (posts && posts.length === 0) {
    alert("There are no posts yet");
  }

  if (posts === undefined) {
    return (
      <SCTimeline>
        <Header/>
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
        <div className="publish">
          <div className="user_picture">
            <img src="https://source.unsplash.com/random" alt="" />
          </div>
          <div className="post-confirm">
            <p>What are you going to share today?</p>
            <form onSubmit={(e) => publish(e)}>
              <input
                placeholder="http:// ..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={disabled}
                required
              />
              <input
                placeholder="Awesome article about #javascript"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={disabled}
              />
              <button {...disabled}>{textButton}</button>
            </form>
          </div>
        </div>
        <div className="published">
          {/* TODO: Trocar para componente */}
          {posts && posts.map((p) => (
              <Post post= {p} setPosts = {setPosts} url={url}/>
          ))}
        </div>
      </SCBody>
      <Trending>
        <p>trending</p>
        <Underline />
        <Tagify
          color="#fffff"
          onClick={(text, type) => console.log(text, type)}
        >
          {trendingHashtags.map((tag, index) => (
            <Link to={`/hashtag/${tag.replace("#", "")}`}>
              <h2 key={index}>{tag}</h2>
            </Link>
          ))}
        </Tagify>
      </Trending>
    </SCTimeline>
  );
}

const Underline = styled.div`
  width: 100%;
  margin-bottom: 10px;
  height: 1px;
  background-color: #484848;
`;

const Trending = styled.div`
  margin-top: 143px;
  border-radius: 16px;
  height: 406px;
  width: 300px;
  background-color: #171717;
  p {
    padding-left: 15px;
    color: white;
    font-family: "Oswald", sans-serif !important;
    font-family: "Passion One", cursive;
    font-weight: 700;
    font-size: 35px;
    line-height: 64px;
  }
  h2 {
    margin-left: 10px;
    margin-top: 5px;
    font-family: "Lato", sans-serif !important;
    color: white;
    font-size: 23px;
    font-weight: 200 !important;
    letter-spacing: 3px;
  }
`;


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
