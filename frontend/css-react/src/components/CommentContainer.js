import { Link } from "react-router-dom";
import apiCalls from "../apis/apiCalls";

const CommentContainer = ({
  comment,
  user,
  currentComments,
  setCurrentComments,
}) => {
  const handleCommentDelete = async () => {
    const deleteCommentResponse = await apiCalls.deleteComment(comment.id);
    if (deleteCommentResponse) {
      const updatedComments = currentComments.filter((c) => {
        return c.id !== comment.id;
      });
      setCurrentComments(updatedComments);
    }
  };

  const created_date_time = new Date(comment.time_created);

  return (
    <div className="comment-container">
      <div className="comment-small-text">{comment.user.email}</div>
      <div className="comment-small-text">
        {created_date_time.toLocaleString()}
      </div>

      <div className="comment-text"> {comment.text}</div>
      {user.id === comment.user.id && (
        <div className="comment-button-container">
          <Link className="link-text" to={`/edit-comment/${comment.id}`}>
            Edit
          </Link>
          <button className="link-text" onClick={handleCommentDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentContainer;
