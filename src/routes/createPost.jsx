import CreatePost from "../components/createPostDetail"
import { Link } from "react-router-dom";

const createPost = () => {
    return (
        <>
        <div>Create Your Post!</div>
        <CreatePost />
        <Link to={`/`}>
            <button>Home</button>
        </Link>
        </>
    );
  };
  
  export default createPost;