import { styled } from "styled-components"
import Header from "../Components/Header"

export default function Timeline(){

    const mockPost = [
        {
            id: 1,
            description: "oba que legal. Trabalho lindo hein. mas já pode... ao mossar?",
            url: "https://stackoverflow.com/questions/38854712/input-placeholder-vertical-align",
            username: "Klovis MadeInChina",
            picture: 'https://source.unsplash.com/random'
        }
    ]

    return(
        <SCTimeline>
            <Header/>
            <SCBody>
                <div>
                    <p>timeline</p>
                </div>
                <div className="publish">
                    <div className="user_picture">
                        <img src='https://source.unsplash.com/random'/>
                    </div>
                    <div className="post-confirm">
                        <p>What are you soing to share today?</p>
                        <form>
                            <input placeholder="http:// ..."/>
                            <input placeholder="Awesome artcle about #javascript"/>
                            <button>Publish</button>
                        </form>
                    </div>
                </div>
                <div className="published">
                    {/* TODO: Trocar para componente */}
                    {mockPost.map(post => 
                        <SCPost key={post.id} className="post">
                            <div className="user">
                                <img src={post.picture}/>
                                <h1>{post.username}</h1>
                            </div>
                            <div className="description">
                                <span>{post.description}</span>
                            </div>
                            <div className="url">
                                <p>AQUI FICARÃO OS DADOS DA URL</p>
                            </div>
                        </SCPost>
                    )}     
                </div>
            </SCBody>
        </SCTimeline>
    )
}

const SCTimeline = styled.div`
    height: 100%;
    margin-top: 72px;
    display: flex;
    justify-content: center;
`
const SCBody = styled.div`
    width: 611px;
    margin-top: 40px;

    div:first-child{
        p{
            color: white;
            font-family: 'Oswald', sans-serif !important;
            font-family: 'Passion One', cursive;
            font-weight: 700;
            font-size: 43px;
            line-height: 64px;
            margin-bottom: 40px;
        }
    }
    .user_picture{
        margin-right: 10px;
        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }
        
    }

    .publish{
        height: 209px;
        border-radius: 16px;
        background-color: white;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.0625);
        display: flex;
        position: relative;
        padding-top: 1px;

        div:first-child{
            margin-left: 10px;
            margin-top: 9px;
        }

        .post-confirm{
            p{
                font-family: 'Lato', sans-serif !important;
                font-family: 'Passion One', cursive;
                color: rgba(112, 112, 112, 1);
                font-size: 20px;
                line-height: 24px;
                font-weight: bold !important;
                margin-top: 10px;
                margin-bottom: 10px;
            }

            form{
                input{
                    background-color: rgba(239, 239, 239, 1);
                    border: none;
                    border-radius: 5px;
                    height: 30px;
                    width: 503px;
                    font-family: 'Lato', sans-serif !important;
                    font-size: 15px;
                    line-height: 18px;
                    margin-bottom: 10px;
                }

                input:nth-child(2){
                    height: 66px;
                    vertical-align: text-top;
                }

                button{
                    position: absolute;
                    right: 18px;
                    bottom: 20px;
                    width: 112px;
                    height: 31px;
                    border: none;
                    border-radius: 5px;
                    background-color: rgba(24, 119, 242, 1);
                    color: white;
                    font-family: 'Lato', sans-serif !important;
                    font-size: 16px;
                    line-height: 16px;
                    text-align: center;
                    font-weight: 700 !important;
                }
            }
        }
    }

    .published{
        margin-top: 40px;
    }
`

const SCPost = styled.div`
    width: 100%;
    height: 276px;
    border-radius: 16px;
    background-color: rgba(23, 23, 23, 1);
    color: white;
    padding-top: 1px;
    
    .user{
        margin-top: 10px;
        margin-left: 10px;
        display: flex;
        align-items: center;

        h1{
            margin-left: 10px;
            margin-top: -10px;
            font-size: 19px;
            font-family: 'Lato', sans-serif !important;
        }

        img{
            width: 50px;
            height: 50px;
            border-radius: 100%;
        }
    }

    .description{
        margin-left: 70px;
        margin-top: -15px;
        span{
            font-family: 'Lato', sans-serif !important;
            font-size: 17px;
            line-height: 21px;
            color: rgba(183, 183, 183, 1);
        }
    }

    .url{
        margin-top: 20px;
        margin-left: 65px;
        border: 1px solid rgba(77, 77, 77, 1);
        border-radius: 16px;
        width: 85%;
    }
`