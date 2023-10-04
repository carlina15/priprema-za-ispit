import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  function getComments(postId) {
    axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((response) => {
        setComments((prevComments) => ({
          ...prevComments, [postId]: response.data,
        }));
      })
      .catch((error) => {
        console.error(`Error fetching comments for post ${postId}:`, error);
      });
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          
          <button onClick={() => getComments(post.id)}>Get comments</button>
          {comments[post.id] && (
            <ul>
              {comments[post.id].map((comment) => (
                <li key={comment.id}>{comment.name}: {comment.body}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default PostList;
