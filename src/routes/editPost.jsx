import EditPostExpanded from "../components/editPostExpanded"
import { Link } from "react-router-dom";

const editPost = () => {
    return (
        <>
        <div>Create Your Post!</div>
        <EditPostExpanded />
        <Link to={`/`}>
            <button>Home</button>
        </Link>
        </>
    );
  };
  
  export default editPost;