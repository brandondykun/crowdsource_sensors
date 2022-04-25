import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import apiCalls from "../apis/apiCalls";
import { useNavigate } from "react-router";

const EditCommentPage = () => {
  const [comment, setComment] = useState(null);
  const params = useParams();
  const formEditCommentRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const getCommentToEdit = async () => {
      const getCommentResponse = await apiCalls.getComment(params.id);
      if (getCommentResponse) {
        setComment(getCommentResponse);
      }
    };
    getCommentToEdit();
  }, [params.id]);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const data = {
      post: comment.post,
      text: formEditCommentRef.current.value,
    };
    const editResponse = await apiCalls.editComment(comment.id, data);
    if (editResponse) {
      navigate(`/post/${comment.post}`);
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Edit Comment</h1>
      <form className="form" onSubmit={handleEditSubmit}>
        <textarea
          className="form-textarea"
          rows="4"
          cols="5"
          type="text"
          name="text"
          placeholder="Comment..."
          ref={formEditCommentRef}
          defaultValue={comment && comment.text}
          maxLength="255"
        />
        <button className="screen-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default EditCommentPage;
