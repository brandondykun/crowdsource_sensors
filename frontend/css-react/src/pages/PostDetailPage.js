import { useEffect, useState, useRef } from "react";
import apiCalls from "../apis/apiCalls";
import { Link, useParams } from "react-router-dom";
import CommentContainer from "../components/CommentContainer";

const PostDetailPage = ({ user, setCurrentMapCenter, setCurrentZoom }) => {
  const [currentPost, setCurrentPost] = useState(null);
  const [currentComments, setCurrentComments] = useState(null);
  const formCommentRef = useRef();

  const params = useParams();

  useEffect(() => {
    const getPost = async () => {
      const response = await apiCalls.getOnePost(params.id);
      if (response) {
        setCurrentPost(response);
        setCurrentComments(response.comments);
      }
    };
    getPost();
  }, [params.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const data = {
      post: params.id,
      text: formCommentRef.current.value,
    };
    const postResponse = await apiCalls.addComment(data);
    if (postResponse) {
      const getResponse = await apiCalls.getOnePost(params.id);
      if (getResponse) {
        setCurrentComments(getResponse.comments);
        formCommentRef.current.value = "";
      }
    }
  };

  const panMapToPost = (post) => {
    const latitude = post.location.coordinates[1];
    const longitude = post.location.coordinates[0];
    setCurrentMapCenter({ lat: latitude, lng: longitude });
    setCurrentZoom(13);
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Post Details</h1>
      <div className="main-post-container">
        <h3>Category: {currentPost && currentPost.category.name}</h3>

        <img
          className="main-post-image"
          src={currentPost && currentPost.image}
          alt=""
        ></img>
        <div className="main-post-text-container">
          <div className="main-post-title">
            {currentPost && currentPost.title}
          </div>
          <div className="main-post-text">
            {currentPost && currentPost.description}
          </div>
          <div className="main-post-date">
            {currentPost && new Date(currentPost.time_created).toLocaleString()}
          </div>
        </div>
        <div>
          {currentPost && currentPost.user === user.id && (
            <Link className="small-button" to={`/edit-post/${currentPost.id}`}>
              Edit Post
            </Link>
          )}
          {currentPost && (
            <Link
              onClick={() => panMapToPost(currentPost)}
              className="small-button"
              to={`/map`}
            >
              {currentPost.user === user.id ? "View on Map" : "Back to Map"}
            </Link>
          )}
        </div>
      </div>

      <div className="comments-list-container">
        {currentComments &&
          currentComments.map((comment) => {
            return (
              <CommentContainer
                comment={comment}
                user={user}
                currentComments={currentComments}
                setCurrentComments={setCurrentComments}
                key={comment.id}
              />
            );
          })}
      </div>
      <form className="form" onSubmit={handleCommentSubmit}>
        <textarea
          className="form-textarea"
          rows="4"
          cols="5"
          type="text"
          name="text"
          placeholder="Comment..."
          ref={formCommentRef}
          maxLength="255"
        />
        <button className="screen-button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default PostDetailPage;
