import PostExpanded from "../components/postExpanded"
import { Link } from "react-router-dom";

const postDetail = () => {
    return (
        <>       
        <PostExpanded />
        <Link to={`/`}>
            <button>Home</button>
        </Link>
        </>
    );
  };
  
  export default postDetail;