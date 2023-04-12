import { useState, useEffect } from 'react';
import './App.css';
import { Comment } from './components/comment';
import { Users } from './components/users';
// import useFetch from './useFetch';

function App() {

  const [posts, setPosts] = useState([]);
  const [onePost, setOnePost] = useState(null);

  const loadPosts = async (postID = 1) => {
    const res = await fetch(`https://dummyjson.com/users/${postID}/posts`)
      .then(res => res.json())

    setPosts(res.posts);
  }

  const loadOnePost = async (postID = 10) => {
    const res = await fetch(`https://dummyjson.com/posts/${postID}`)
      .then(res => res.json())

    setOnePost(res);
  }

  const handleChildClick = (postID) => {
    loadPosts(postID);
  }

  useEffect(() => {
    loadPosts();
    loadOnePost();
  }, []);

  function getOneUserAllPosts(userID) {
    console.log(`userID-----!!!`, userID);
    loadPosts(userID);
  }

  return (

    <table>
      <thead>
        <tr>
          <th>User Name</th>
          <th>Posts</th>
          <th>Post Details</th>
        </tr>
      </thead>

      <tbody>

        <tr>
          <Users getOneUserAllPosts={getOneUserAllPosts} />
        </tr>


        <tr>
          {posts &&
            <ul>
              {posts.map(post => (
                <li key={post.id}>
                  <p>{post.title}</p>
                  <button onClick={() => loadOnePost(post.id)}> Expand </button>
                </li>
              ))}
            </ul>
          }
        </tr>


        <tr>
          {onePost &&
            <ul>
              <li>
                <h1>{onePost.title}</h1>
                <p>{onePost.body}</p>

                <Comment postID={onePost.id} />

              </li>
            </ul>
          }
        </tr>

      </tbody >
    </table >

  );
}

export default App;
