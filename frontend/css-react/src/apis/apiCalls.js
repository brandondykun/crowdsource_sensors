import axios from "axios";
import apiHelpers from "./apiHelpers";

const BASE_URL = "http://localhost:8000/";

const apiCalls = {};

const tryCatchFetch = async (axiosCall) => {
  try {
    const response = await axiosCall();
    return response.data ? response.data : { message: "success" };
  } catch (e) {
    console.error("ERROR:", e.response ? e.response.data : e);
    return null;
  }
};

apiCalls.getAllPosts = async () => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}all-posts/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getMyPosts = async () => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}my-posts/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getOnePost = async (id) => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}all-posts/${id}`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.createNewPost = async (data) => {
  return await tryCatchFetch(() =>
    axios.post(`${BASE_URL}my-posts/`, data, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getAllCategories = async () => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}categories/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.addComment = async (data) => {
  return await tryCatchFetch(() =>
    axios.post(`${BASE_URL}comments/`, data, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getComment = async (id) => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}comments/${id}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.editComment = async (id, data) => {
  return await tryCatchFetch(() =>
    axios.put(`${BASE_URL}comments/${id}/`, data, apiHelpers.getCsrfConfig())
  );
};

apiCalls.editPost = async (id, data) => {
  return await tryCatchFetch(() =>
    axios.patch(`${BASE_URL}my-posts/${id}/`, data, apiHelpers.getCsrfConfig())
  );
};

apiCalls.deletePost = async (id) => {
  return await tryCatchFetch(() =>
    axios.delete(`${BASE_URL}my-posts/${id}/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.deleteComment = async (id) => {
  return await tryCatchFetch(() =>
    axios.delete(`${BASE_URL}comments/${id}/`, apiHelpers.getCsrfConfig())
  );
};

// User Authentication
apiCalls.logOut = async () => {
  return await tryCatchFetch(() =>
    axios.post(`${BASE_URL}logout/`, null, apiHelpers.getCsrfConfig())
  );
};

apiCalls.signUp = async (userData) => {
  return await tryCatchFetch(() =>
    axios.post(`${BASE_URL}users/`, userData, apiHelpers.getCsrfConfig())
  );
};

apiCalls.login = async (loginData) => {
  return await tryCatchFetch(() =>
    axios.post(`${BASE_URL}login/`, loginData, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getUserLocation = async (loginData) => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}get-location/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.verifyUser = async () => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}verify-user/`, apiHelpers.getCsrfConfig())
  );
};

apiCalls.getNews = async () => {
  return await tryCatchFetch(() =>
    axios.get(`${BASE_URL}news/`, apiHelpers.getCsrfConfig())
  );
};

export default apiCalls;
