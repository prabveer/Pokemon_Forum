import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mylkdlyzovgyusvfppux.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const editPostExpanded = () => {
    const [posts, setPosts] = useState(null);
    const [count, setCount] = useState([])
    let params = useParams();

    useEffect (() => {
        async function getPosts() {
          const {data, error} = await supabase.from('Posts').select().eq('id', params.id);
          if(error) {
            console.warn(error)
          }
          setPosts(data)
          console.log(data)
        }
        getPosts()
    }, [])

    const handleSubmit = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .update({title: count.name, content: count.title, image_url: count.role})
        .eq('id', params.id);

    
      window.location = "/";
    }
    
    const handleInputChange = (event)  => {
        const name = event.target.name;
        const value = event.target.value;

        setCount(values => ({...values, [name]: value}))
      }

      const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', params.id); 
      
        window.location = "/";
      }

    return (
        <>
        <div>Current info</div>
        {posts == null ? console.log('null') :  posts.map(function(item) { return(<><div>Title: {item.title} </div> <div>Description: {item.content}</div>  <img src={item.image_url}/></>)})}

        <form onSubmit={handleSubmit}>
            <label for="name">Title</label> <br />
            <input type="text" itd="name" name="name" value={count.name || ""}  onChange={handleInputChange} required/><br />
            <br/>

            <label for="title">Body</label><br />
            <textarea  type="text" id="title" name="title" value={count.title || ""} onChange={handleInputChange} required/><br />
            <br/>

            <label for="role">Image URL (optional)</label><br />
            <input type="text" id="role" name="role" value={count.role || ""} onChange={handleInputChange}/><br />
            <br/>
            <input type="submit" value="Submit" />
        </form>
        <button onClick={deletePost}>Delete Post</button>

        </>
    );
  };
  
  export default editPostExpanded;