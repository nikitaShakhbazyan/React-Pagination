import React, { useState, useEffect } from 'react';
import './App.css';
import type { Posts } from './interface';

function App() {
  const [posts, setPosts] = useState<Posts[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showLoadMoreButton, setShowLoadMoreButton] = useState<boolean>(false);
  const itemsPerPage = 5;
  const [loadingMore, setLoadingMore] = useState<boolean>(false); // Состояние для отслеживания процесса загрузки дополнительных данных

  const fetchData = async (page: number) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${itemsPerPage}&_page=${page}`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    if (scrollY + windowHeight >= documentHeight - 100 && !loadingMore) { // Добавляем проверку loadingMore
      setLoadingMore(true); // Устанавливаем loadingMore в true перед началом загрузки
      setCurrentPage(prevPage => prevPage + 1);
    }
  }; 

  const handleLoadMoreClick = () => {
    setLoadingMore(true); // Устанавливаем loadingMore в true при нажатии на кнопку "Load More"
    setCurrentPage(prevPage => prevPage + 1);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [posts, loadingMore]); // Обновляем обработчик скролла при изменении списка постов и loadingMore

  useEffect(() => {
    fetchData(currentPage)
      .then(newPosts => {
        setTimeout(() => { // Добавляем задержку перед установкой новых постов
          setPosts(prevPosts => [...prevPosts, ...newPosts]);
          setLoadingMore(false); // Устанавливаем loadingMore в false после завершения загрузки
        }, 2000); // Задержка в 2 секунды
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
