import PostExpanded from "../components/postExpanded"
import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const supabaseUrl = 'https://mylkdlyzovgyusvfppux.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

let upvotes;

const postDetail = () => {
    const [champions, setChampions] = useState(null);
    const [count, setCount] = useState([])
    let params = useParams();

    useEffect (() => {
        async function getChampions() {
          const {data, error} = await supabase.from('Posts').select().eq('id', params.id);
          if(error) {
            console.warn(error)
          }
          console.log(data)
          setChampions(data)
        }
        getChampions()
    }, [])

    const upvote = async (event) => {
        event.preventDefault();
        champions.map(function(item) {
            upvotes = item.upvotes+1
        })
      
        await supabase
          .from('Posts')
          .update({upvotes: upvotes})
          .eq('id', params.id); 
      
        window.location = `/postdetail/${params.id}`;
      }
      const handleInputChange = (event)  => {
        const name = event.target.name;
        const value = event.target.value;

        setCount(values => ({...values, [name]: value}))
      }

      const handleSubmit = async (event) => {
        let arr = []
        event.preventDefault();
        champions.map(function(item) { 
            item.comments.map((text) => {
                arr.push(text)
            })
        })
        arr.push(count.name)
        await supabase
        .from('Posts')
        .update([{comments: 
            arr}])
        .eq('id', params.id);

    
       window.location = `/postdetail/${params.id}`;
    }

    return (
        <>
      <div className="body">
            {champions == null ? console.log() :
            champions.map(function(item) {
                return (
                    <>
                        <div className='postBoxExpanded'>
                            <div className='postTitle'>{item.title}</div>
                            <img src={item.image_url} />

                            <div className="postBottomText">
                                <div>{item.content}</div>
                                <div className="vote">
                                    <div>upvotes: {item.upvotes}</div>
                                    <div>
                                        <button onClick={upvote}>^</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
            <div>Comments</div>
            {champions == null ? console.log('null') :
            champions.map(function(item) {
                if(item.comments != null)
                {
                    return item.comments.map((val) => {
                        return (
                            <>
                            <div>{val}</div>
                            </>
                        )
                    })
                }
            })}
                    <>
            <form onSubmit={handleSubmit}>
                <label for="name">enter your comment</label> <br />
                <input type="text" itd="name" name="name" value={count.name || ""}  onChange={handleInputChange} required/><br />
                <br/>
            </form>
            </>
        </div>
        
        <Link to={`/editpost/${params.id}`} key= {params.id}>
            <div>Edit</div>
        </Link>
        </>
    );
  };
  
  export default postDetail;