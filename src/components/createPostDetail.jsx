import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mylkdlyzovgyusvfppux.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)


const createPostDetail = () => {
    const [count, setCount] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault();

        await supabase
        .from('Posts')
        .insert({title: count.name, content: count.title, image_url: count.role})
        .select();
    
      window.location = "/";
    }


    const handleInputChange = (event)  => {
        const name = event.target.name;
        const value = event.target.value;

        setCount(values => ({...values, [name]: value}))
    }


    return (
        <>
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
    </>
    );
  };
  
  export default createPostDetail;