import { useState, useEffect } from 'react';
import './App.css';
import { Comment } from './components/comment';
import { Users } from './components/users';

function App() {
  // This state is used to store the posts of the active user
  const [posts, setPosts] = useState([]);
  // This state is used to store the details of the active post
  const [onePost, setOnePost] = useState(null);
  // This state is used to store the active user ID
  const [userID, setUserID] = useState(1);
  // This state is used to store the active post ID
  const [postID, setPostID] = useState(10);

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the posts for a given user ID
  const loadPosts = async (userID = 1) => {
    try {
      const res = await fetch(`https://dummyjson.com/users/${userID}/posts`);
      const data = await res.json();
      setPosts(data.posts);
      setPostID(data.posts[0].id);
      loadOnePost(data.posts[0].id);
      setIsLoading(false);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  }

  // Fetch the details of a single post
  const loadOnePost = async (postID = 10) => {
    const res = await fetch(`https://dummyjson.com/posts/${postID}`)
      .then(res => res.json())

    setOnePost(res);
  }

  // Load posts and details for the initial user ID and when the user ID changes
  useEffect(() => {
    loadPosts(userID);
    loadOnePost(postID);
  }, [userID]);

  // Handler for clicking on a user to load their posts and pass this prop to the App component
  function getOneUserAllPosts(userID) {
    setUserID(userID);
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <h1>Awesome Post Page</h1>
      <table class="styled-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Posts</th>
            <th>Post Details</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            {/* Render the Users component and pass in the getOneUserAllPosts function */}
            <Users getOneUserAllPosts={getOneUserAllPosts} />
            {/* Render the posts for the active user */}
            {posts &&
              <th>
                {posts.map(post => (
                  <div className={`allPosts ${onePost.id === post.id && "active"}`} key={post.id}>
                    <p>{post.title}</p>
                    <button onClick={() => loadOnePost(post.id)}> Expand </button>
                  </div>
                ))}
              </th>
            }

            {/* Render the details for the active post */}
            {onePost &&
              <th>
                <div className="onePost">
                  <h2>{onePost.title}</h2>
                  <p>{onePost.body}</p>
                </div>
                <div>
                  <Comment postID={onePost.id} />
                </div>
              </th>
            }
          </tr>

        </tbody >
      </table >

      <footer>
        <div>
          @2023 Awesome Post Page
        </div>
      </footer>
    </div>
  );
}

export default App;
