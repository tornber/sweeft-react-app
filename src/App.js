import './App.css';
import {useState,useEffect} from 'react'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import Cards from './Components/Cards';
import Profile from './Components/Profile';

function App() {

  const [cards,setCards] = useState([])
  const [page,setPage] = useState(1)

  const onScroll = () => {
    const {scrollTop,clientHeight,scrollHeight} = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => ++prevPage)
    }
  }

  const fetchData = () => {
    fetch(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`)
    .then(res => res.json())
    .then(res => setCards((prevCards) => {
      return prevCards.concat(res.list)
    }))
    .catch(err => console.log(err))
  }

  useEffect(() => {
    fetchData()
    window.addEventListener('scroll',onScroll)
    return () => window.removeEventListener('scroll',onScroll)
  },[page])

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
        <Route path="/" element={<Cards cards={cards}/>} />
        <Route path="/user/:userId" element={<Profile/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
