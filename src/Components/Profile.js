import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams, useNavigate } from 'react-router-dom'
const Profile = (props) => {

    const params = useParams()
    const navigate = useNavigate()
    const [user,setUser] = useState({})
    const [friends,setFriends] = useState([])
    const [page,setPage] = useState(1)
    const [seenProfiles,setSeenProfiles] = useState([])

    const fetchUserData = () => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.userId}`)
        .then(res => res.json())
        .then(res => setUser(() => res))
        .catch(err => console.log(err))
      }
    
    const fetchFriendsData = () => {
        fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${params.userId}/friends/${page}/20`)
        .then(res => res.json())
        .then(res => setFriends((prevFriends) => {
            return prevFriends.concat(res.list)
          }))
        .catch(err => console.log(err))
    }

    const onScroll = () => {
        const {scrollTop,clientHeight,scrollHeight} = document.documentElement
        if (scrollTop + clientHeight >= scrollHeight) {
            setPage((prevPage) => ++prevPage)
        }
      }

    const handleClick = (id) => {
      setSeenProfiles((prevSeenProfiles) => {
        for(let item in prevSeenProfiles) {
          if (item.name === user.name) {
            return [...prevSeenProfiles]
          }
        }
        return [...prevSeenProfiles,{prefix: user.prefix,name: user.name,lastName: user.lastName}]
       })
      navigate(`/user/${id}`)
    }

    useEffect(() => {
        fetchUserData()
        fetchFriendsData()
        window.addEventListener('scroll',onScroll)
        return () => window.removeEventListener('scroll',onScroll)
    },[page,params])


  return (
    <div className='profile'>
        {friends && user ? (<div>
          <div className='user--info'>
              <img src={user.imageUrl} />
              <div className='info'>
                  <h1>Info</h1>
                  <p>{user.prefix} {user.name} {user.lastName}</p>
                  <p>{user.title}</p>
                  <p><span>Email:</span> {user.email}</p>
                  <p><span>Ip Address:</span> {user.ip}</p>
                  <p><span>Job Area:</span> {user.jobArea}</p>
                  <p><span>Job Area:</span> {user.jobArea}</p>
                  <p><span>Job Type:</span> {user.jobType}</p>
              </div>
              <div className='address'>
                  <h1>Address</h1>
                  <p >{user.company?.name} {user.company?.suffix}</p>
                  <p><span>City: {user?.address?.city}</span></p>
                  <p><span>Country: {user?.address?.country}</span></p>
                  <p><span>State: {user?.address?.state}</span></p>
                  <p><span>Street Address: {user?.address?.streetAddress}</span></p>
                  <p><span>ZIP: {user?.address?.zipCode}</span></p>
              </div>
          </div>
          <div className='user--name'>
            {seenProfiles.length > 0 ? (seenProfiles.map(user => {
              if(user.name) {
                return (<a href={`user/${params.userId}`}>{user.prefix} {user.name} {user.lastName}</a>)
              }
            })) : (<a href={`user/${params.userId}`}>{user.prefix} {user.name} {user.lastName}</a>)}
          </div>
          <h1 className='friends--header'>Friends:</h1>
          <div className='container'>
              {friends.length > 0 && friends.map((friend) => (
              <div key={friend.id} className='friend--container' onClick={() => handleClick(friend.id)}>
                  <div className='friend'>
                  <img src={friend.imageUrl} alt="user profile image"/>
                  <h1>{friend.prefix} {friend.name} {friend.lastName}</h1>
                  <h1>{friend.title}</h1>
                  </div>
              </div>
            )
          )}
          </div>
        </div>) : (<h1 style={{textAlign: 'center',marginTop: "150px"}}>Loading...</h1>)}
    </div>
  )
}

export default Profile