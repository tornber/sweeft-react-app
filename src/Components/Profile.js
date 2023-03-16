import React, { useEffect, useState } from 'react'
import './Profile.css'
import { useParams } from 'react-router-dom'
const Profile = () => {

    const params = useParams()
    const [user,setUser] = useState({})
    const [friends,setFriends] = useState([])
    const [page,setPage] = useState(1)

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
    
    
    useEffect(() => {
        fetchUserData()
        fetchFriendsData()
        console.log(user)
        console.log(friends)
        window.addEventListener('scroll',onScroll)
        return () => window.removeEventListener('scroll',onScroll)
    },[page])


  return (
    <div className='profile'>
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
                <p >{user.company.name} {user.company.suffix}</p>
                <p><span>City: {user.address.city}</span></p>
                <p><span>Country: {user.address.country}</span></p>
                <p><span>State: {user.address.state}</span></p>
                <p><span>Street Address: {user.address.streetAddress}</span></p>
                <p><span>ZIP: {user.address.zipCode}</span></p>
            </div>
        </div>
        <a href={`user/${params.userId}`} className='user--name'>{user.prefix} {user.name} {user.lastName}</a>
        <h1 className='friends--header'>Friends:</h1>
        <div className='container'>
            {friends.length > 0 ?  friends.map((friend) => (
            <div key={friend.id} className='friend--container'>
                <div className='friend'>
                <img src={friend.imageUrl} alt="user profile image"/>
                <h1>{friend.prefix} {friend.name} {friend.lastName}</h1>
                <h1>{friend.title}</h1>
                </div>
            </div>
          )
        ) : <h1 style={{textAlign: 'center',marginTop: "150px"}}>Loading...</h1>}
        </div>
    </div>
  )
}

export default Profile