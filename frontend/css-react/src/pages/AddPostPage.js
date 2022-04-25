import apiCalls from "../apis/apiCalls";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

const AddPostPage = ({ user, setCurrentMapCenter, setCurrentZoom }) => {
  const [categories, setCategories] = useState(null);
  const [file, setFile] = useState(null);

  const categoryRef = useRef();
  const titleRef = useRef();
  const descriptionRef = useRef();
  // const imageRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    const getCategories = async () => {
      const response = await apiCalls.getAllCategories();
      if (response) {
        setCategories(response);
      }
    };
    getCategories();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user", user.id);
    formData.append("category", categoryRef.current.value);
    formData.append("category_id", categoryRef.current.value);
    formData.append("title", titleRef.current.value);
    formData.append("description", descriptionRef.current.value);
    formData.append("image", file);

    const createResponse = await apiCalls.createNewPost(formData);
    if (createResponse) {
      setCurrentMapCenter({
        lat: createResponse.location.coordinates[1],
        lng: createResponse.location.coordinates[0],
      });
      setCurrentZoom(16);
      navigate("/map");
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Add Post</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <label className="form-label" htmlFor="category">
          Category
        </label>
        <select name="select" className="form-input" ref={categoryRef}>
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
          placeholder="Post Title..."
          ref={titleRef}
          maxLength="64"
        />
        <textarea
          className="form-textarea"
          rows="4"
          cols="5"
          type="text"
          name="description"
          placeholder="Description..."
          maxLength="255"
          ref={descriptionRef}
        />
        <input
          className="form-input file-input"
          type="file"
          name="image"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          className="screen-button"
          type="submit"
          accept="image/jpeg, image/JPG, image/jpg, img/JPEG"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostPage;
