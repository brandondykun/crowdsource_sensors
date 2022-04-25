import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import apiCalls from "../apis/apiCalls";

const EditPostPage = () => {
  const [post, setPost] = useState(null);
  const [categories, setCategories] = useState(null);

  const params = useParams();
  const navigate = useNavigate();

  const categoryRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();

  const getPost = async () => {
    const postResponse = await apiCalls.getOnePost(params.id);
    if (postResponse) {
      setPost(postResponse);
    }
  };

  const getCategories = async () => {
    const response = await apiCalls.getAllCategories();
    if (response) {
      setCategories(response);
    }
  };

  useEffect(() => {
    getPost();
  }, [params.id]);

  useEffect(() => {
    getCategories();
  }, []);

  const handleEditPostSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("category_id", categoryRef.current.value);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);

    const data = {};
    const editPostResponse = await apiCalls.editPost(params.id, formData);
    if (editPostResponse) {
      navigate(`/post/${params.id}`);
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Edit Post</h1>
      {post && (
        <div>
          <div className="main-post-container edit-post">
            <img
              className="main-post-image"
              src={post && post.image}
              alt=""
            ></img>
          </div>
          <form className="form" onSubmit={handleEditPostSubmit}>
            <label className="form-label" htmlFor="category">
              Category
            </label>
            <select
              name="select"
              className="form-input"
              ref={categoryRef}
              defaultValue={post.category.id}
            >
              {categories &&
                categories.map((cat) => {
                  return (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  );
                })}
            </select>

            <input
              className="form-input"
              type="text"
              name="title"
              placeholder="Post Title...."
              defaultValue={post.title}
              ref={titleRef}
              maxLength="64"
            />
            <textarea
              className="form-textarea"
              rows="4"
              cols="5"
              type="text"
              name="description"
              ref={descriptionRef}
              placeholder="Description...."
              defaultValue={post.description}
              maxLength="255"
            />

            <button
              className="screen-button"
              type="submit"
              accept="image/jpeg, image/JPG, image/jpg, image/heif"
            >
              Submit
            </button>
          </form>
          <div />
        </div>
      )}
    </div>
  );
};

export default EditPostPage;
