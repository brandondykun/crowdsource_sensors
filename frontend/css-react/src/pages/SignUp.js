import { useNavigate } from "react-router";
import apiCalls from "../apis/apiCalls";
import { useRef } from "react";

const SignUp = (props) => {
  const navigate = useNavigate();

  const formEmailRef = useRef();
  const formPasswordRef = useRef();
  const formConfirmPasswordRef = useRef();

  const handleSignUpFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      email: formEmailRef.current.value,
      username: formPasswordRef.current.value,
      password: formConfirmPasswordRef.current.value,
      // confirmPassword: e.target.elements["confirm-password"].value,
    };

    const signUpResponse = await apiCalls.signUp(userData);
    if (signUpResponse) {
      const loginData = {
        email: e.target.elements["email"].value,
        password: e.target.elements["password"].value,
      };
      const loginResponse = await apiCalls.login(loginData);
      if (loginResponse) {
        props.setUser(loginResponse.email);
        navigate("/");
      }
    }
  };

  return (
    <div className="main-content">
      <h1 className="page-title">Sign Up</h1>
      <form className="form" onSubmit={handleSignUpFormSubmit}>
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

        <input
          type="password"
          name="confirm-password"
          placeholder="confirm password"
          required
          ref={formConfirmPasswordRef}
          className="form-input"
        />
        <button className="screen-button" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
