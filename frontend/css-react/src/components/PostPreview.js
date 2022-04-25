import { Link } from "react-router-dom";
import apiCalls from "../apis/apiCalls";

const PostPreview = ({ post, myPosts, setMyPosts }) => {
  const d = new Date(post.time_created);
  const date = d.toDateString();
  const time = d.toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const handlePostDelete = async () => {
    const deleteResponse = await apiCalls.deletePost(post.id);
    if (deleteResponse) {
      const updatedPosts = myPosts.filter((myPost) => {
        return myPost.id !== post.id;
      });
      setMyPosts(updatedPosts);
    }
  };

  return (
    <div className="post-preview-container">
      <div className="main-post-title">{post.title}</div>
      <div className="main-post-date">{date}</div>
      <div className="main-post-date">{time}</div>
      <div>
        <Link to={`/post/${post.id}`}>
          <img
            className="preview-image"
            src={post.image}
            alt={post.description}
          />
        </Link>
      </div>
      <div>
        <div>{post.description}</div>
        <div className="button-container">
          <Link className="small-button" to={`/edit-post/${post.id}`}>
            Edit Post
          </Link>
          <button className="small-button" onClick={handlePostDelete}>
            Delete Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostPreview;
