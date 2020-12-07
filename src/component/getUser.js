// import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';

export default function GetUser(pageNumber) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [allUser, setAllUser] = useState([])
  const [hasMore, setHasMore] = useState(false)
  const [lastElementId, setLastElementId] = useState(0)


  useEffect(()=>{
    setLoading(true)
    setError(false)

    axios({
      method: 'GET',
      url: `https://api.github.com/users?`,
      params: {since: pageNumber},
    }).then(res => {
      setAllUser(prevAllUser => {
        return [...prevAllUser, ...res.data.map(b => [b.login, b.id, b.avatar_url])]
      })
      setHasMore(res.data.length > 0)
      setLoading(false)
      // console.log(res.data)
      setLastElementId(res.data[res.data.length - 1].id)
    })
    .catch((error) => {
      console.log(error);
    })
  }, [pageNumber])


  return (
    { loading, error, allUser, hasMore, lastElementId}
  )
}
