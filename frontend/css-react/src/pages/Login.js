import { useNavigate } from "react-router";
import apiCalls from "../apis/apiCalls";
import { useRef } from "react";

const Login = (props) => {
  const navigate = useNavigate();
  const formEmailRef = useRef();
  const formPasswordRef = useRef();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      email: formEmailRef.current.value,
      password: formPasswordRef.current.value,
    };

    const response = await apiCalls.login(loginData);
    if (response) {
      props.setUser(response);
      navigate("/map");
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Log In</h1>
      <form className="form" onSubmit={handleFormSubmit}>
        <input
          type="text"
          name="email"
          placeholder="email"
          required
          ref={formEmailRef}
          className="form-input"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          ref={formPasswordRef}
          className="form-input"
        />
        <button className="screen-button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
};

export default Login;
