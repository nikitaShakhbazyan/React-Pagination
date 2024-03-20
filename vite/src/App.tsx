import { useState,useEffect} from 'react'
import './App.css'
import { fetching } from './fetching/fetching'

interface Posts {
  userId : number,
  id : number,
  title:string,
  body:string
}

function App() {
  const [posts, setPosts] = useState<Posts[]>([])


  useEffect(() => {
    const fetchData = async() => {
      const data = await fetching()
      setPosts(data)
    }
    fetchData()
  }, [])
  


  useEffect(() => {
    document.addEventListener('scroll',scrollHandler)

    return function () {
      document.removeEventListener('scroll',scrollHandler)

    }
  }, [])
  

  const scrollHandler = () => {
    console.log("scr")
  }

  return (
    <>
    {posts.map(post => (
      <div key={post.id} style={{border:'4px solid red'}}>
        <h2>{post.id}</h2>
        <h1>{post.title}</h1>
        <h2>{post.body}</h2>
      </div>
    ))}
    </>
  )
}

export default App
