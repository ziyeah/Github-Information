import React, {useState} from 'react';
import './userCard.css'
import axios from 'axios';
// import GetRepo from './../getRepo';


export default function UserCard(props) {
  const {name, avatar_url} = props
  const [repos, setRepos] = useState([])
  const [followers, setFollowers] = useState([])
  const [show, setShow] = useState(false)

  async function showDetail (){
    // get repositories 
    await axios({
      method: 'GET',
      url: `https://api.github.com/users/${name}/repos`,
    }).then( res => {
      setRepos(res.data.map(r => [r.name]))
    })
    .catch((error) => {
      console.log(error);
    })

    // get followers
    await axios({
      method: 'GET',
      url: `https://api.github.com/users/${name}/followers`,
    }).then( res => {
      setFollowers(res.data.map(r => [r.login]))
    })
    .catch((error) => {
      console.log(error);
    })

    setShow(!show)    
  }


  return (
    <div>
      <div className='cardContainer' onClick={showDetail}>
        <img className='avatarImage' src={avatar_url} alt='' width='80' ></img>
        <div className='cardChild'><b>{name}</b></div>
      </div>

      {show &&
      <div className='CardDetail'>
        <h4>Repositories </h4>
        <div >{repos.join(', ')}</div>
        <h4>Followers</h4>
        <div >{followers.join(', ')}</div>
      </div>
      }

    </div>
  )
}
