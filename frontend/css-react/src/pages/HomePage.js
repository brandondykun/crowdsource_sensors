import { useEffect, useState } from "react";
import apiCalls from "../apis/apiCalls";
import PostPreview from "../components/PostPreview";

const HomePage = () => {
  const [myPosts, setMyPosts] = useState();

  const getUserPosts = async () => {
    const posts = await apiCalls.getMyPosts();
    if (posts) {
      setMyPosts(posts);
    }
  };

  useEffect(() => {
    getUserPosts();
  }, []);

  return (
    <div className="main-content">
      <h1 className="page-title">Home Page</h1>
      <div className="responsive-width-container">
        <h2>Your Posts</h2>
        {myPosts &&
          myPosts.map((post) => {
            return (
              <PostPreview
                key={post.id}
                post={post}
                myPosts={myPosts}
                setMyPosts={setMyPosts}
              />
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
