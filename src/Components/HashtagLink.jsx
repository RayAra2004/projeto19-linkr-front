import { Link } from "react-router-dom";

export default function HashtagLink({index, tag}){
    return(
      <Link data-test="hashtag" to={`/hashtag/${tag.replace("#", "")}`}>
              <h2 key={index}>{tag}</h2>
      </Link>
    )
}