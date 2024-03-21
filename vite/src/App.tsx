import React, { useState, useEffect } from 'react';
import './App.css';
import type { Posts } from './interface';
import { fetchData ,itemsPerPage} from './fetching/fetch';


function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false); 

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100 && !loadingMore && !showLoadMoreButton) { 
      setLoadingMore(true);
      setCurrentPage(prevPage => prevPage + 1);
    }
  }; 

  const handleLoadMoreClick = () => {
    setLoadingMore(true); 
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts, loadingMore, showLoadMoreButton]); 

  useEffect(() => {
    fetchData(currentPage)
      .then(newPosts => {
        setTimeout(() => { 
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setLoadingMore(false);
        }, 500); // Задержка в 0.5 секунд
      });
  }, [currentPage]);

  useEffect(() => {
    setShowLoadMoreButton(posts.length >= itemsPerPage * 5);
  }, [posts]);

  return (
    <div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h1>TITLE {post.title}</h1> 
            <h2>ID {post.id}</h2>
          </li>
        ))}
      </ul>
      {showLoadMoreButton && (
        <button onClick={handleLoadMoreClick}>Load More</button> 
      )}
    </div>
  );
}

export default App;
