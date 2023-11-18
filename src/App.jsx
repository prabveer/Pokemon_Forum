import { useState, useEffect } from 'react'
import './App.css'
import { Link } from "react-router-dom";

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mylkdlyzovgyusvfppux.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const [champions, setChampions] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [updoots, setUpdoots] = useState(false);
  const [time, setTime] = useState(false);

  useEffect (() => {
      async function getChampions() {
        const {data, error} = await supabase.from('Posts').select();
        if(error) {
          console.warn(error)
        }
        console.log(data)
        setChampions(data)
        console.log(champions)
      }
      getChampions()
  }, [])

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    console.log(searchValue)
    let filt = champions.filter((val) => val.title.includes(searchValue))
    console.log(filt)
    if(updoots)
    {
      const dat = champions.concat()
      filt = dat.sort((a , b) => b.upvotes - a.upvotes)
    }
    else if(time)
    {
      const dat = champions.concat()
      filt = filt.sort((a , b) => a.id - b.id)
    }
    console.log(filt)
    setFilteredResults(filt)
  }

  const doots = () => {
    setUpdoots(!updoots)
  };

  const date = () => {
    setTime(!time)
  };

  return (
    <>
      <header className='Header'>
          <h2>Pokemon Hub</h2>
          <input
            type="text"
            placeholder="Search..."
            onChange={(inputString) => searchItems(inputString.target.value)}
          />
          <button>Home</button>
          <Link to={`/MakePost`}>
            <button>Create a Post</button>
          </Link>
      </header>
      <div>
        Sort by
        <button onClick={date}>date</button>
        <button onClick={doots}>upvotes</button>
      </div>
      {champions == null ? console.log('null') :
      <>
      {searchInput.length > 0 || updoots || time ? 
                  filteredResults.map(function(item) {
                    return (
                        <>
                            <div className='postBox'>
                                <div className='time'>post made on: {item.created_at}</div>
                                <div className='postTitle'>{item.title}</div>
                                <div className="postBottomText">
                                  <div>upvotes: {item.upvotes}</div>
                                  <Link
                                  to={`/postdetail/${item.id}`}
                                  key= {item.id}>
                                      <div>More Details</div>
                                  </Link>
                                </div>
                            </div>
                        </>
                    )
                }) : 
                champions.map(function(item) {
                  return (
                      <>
                          <div className='postBox'>
                              <div className='time'>post made on: {item.created_at}</div>
                              <div className='postTitle'>{item.title}</div>
                              <div className="postBottomText">
                                <div>upvotes: {item.upvotes}</div>
                                <Link
                                to={`/postdetail/${item.id}`}
                                key= {item.id}>
                                    <div>More Details</div>
                                </Link>
                              </div>
                          </div>
                      </>
                  )
              })}
            </>
            }
    </>
  )
}

export default App
