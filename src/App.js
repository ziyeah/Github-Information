import React, { useState, useRef, useCallback } from 'react';
import './App.css';
import GetUser from './component/getUser';
import UserCard from './component/userCard/userCard';

function App() {
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(0)
  const { loading, error, allUser, hasMore, lastElementId } = GetUser(pageNumber)


  const observer = useRef()
  const lastUserElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore){
        setPageNumber(lastElementId)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading, hasMore, lastElementId])


  const findUser = (allUser, query) => {
    var users = []
    if (query){
      for (let i=0; i<allUser.length; i++ ){
        if (allUser[i][0].includes(query)) {
          users.push(allUser[i])
        }
      }
    }
    return users
  }


  return (
    <div className="App">
      <input id='inputBox' type='text' placeholder="Search.." onChange={e=>setQuery(e.target.value)}></input>
    
      {query.length === 0 && 
        <div className='container'>
          {allUser.map((user, index) => {
            if (allUser.length === index + 1){
              return <div ref={lastUserElementRef} key={user[1]}>{user[0]}</div>
            } else {
              return <UserCard name={user[0]} key={user[1]} avatar_url={user[2]} />
            }
          })}
          <div>{loading && 'Loading...'}</div>
          <div>{error && 'Error...'}</div>
        </div>
      }
      

      {query.length !== 0 && 
        findUser(allUser, query)
        .map((user) => {
          return <UserCard name={user[0]} key={user[1]} avatar_url={user[2]} />
        })
      }
      
      
    </div>
  );
}

export default App;
