import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchPostById } from '../fetching/fetch'; 
import type { DetailPost } from '../interface';

const Details = () => {
  const { id } = useParams<{ id?: string }>();
  const [post, setPost] = useState<DetailPost | null>(null);

  useEffect(() => {
    if (id) { 
      const postId = parseInt(id);
      fetchPostById(postId)
        .then((data) => {
          setPost(data); 
        })
        .catch((error) => {
          console.error('Error fetching post details:', error);
        });
    }
  }, [id]); 

  if (!post) {
    return <div>Loading...</div>; 
  }

  return (
    <div>
      <h2>Details Page for ID: {id}</h2>
      <h3>Title: {post.title}</h3>
      <p>Body: {post.body}</p>
      <Link to={'/'}>Back to main</Link>
    </div>
  );
};

export default Details;
