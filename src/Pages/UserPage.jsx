import { styled } from "styled-components";
import Header from "../Components/Header";
import Post from "../Components/Post";

export default function UserPge(){
    return(
        <SCTimeline>
            <Header/>
            <SCBody>
            <div className="timeline">
                <p>timeline</p>
            </div>
            <div className="published">
                {posts &&
                    posts.map((p) => (
                    <Post
                        setAtualizar={setAtualizar}
                        atualizar={atualizar}
                        post={p}
                        setPosts={setPosts}
                        permission = {false}
                    />
                ))}
            </div>
            </SCBody>

        </SCTimeline>
    )
}

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
  
  .published {
    margin-top: 40px;
  }
`;