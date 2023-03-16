import React from 'react'
import './Cards.css';
import { useNavigate } from 'react-router-dom';

const Cards = ({cards}) => {

  const navigate = useNavigate()

  const handleClick = (id) => {
    navigate(`/user/${id}`)
  }

  return (
    <div className="cards">
        {cards.length > 0 ?  cards.map((card) => (
            <div key={card.id} className='card' onClick={() => handleClick(card.id)}>
              <img src={card.imageUrl} alt="user profile image"/>
              <h1>{card.prefix} {card.name} {card.lastName}</h1>
              <h1>{card.title}</h1>
            </div>
          )
        ) : <h1 style={{textAlign: 'center',marginTop: "150px"}}>Loading...</h1>}
      </div>
  )
}

export default Cards