import Cookie from "js-cookie";

const apiHelpers = {};

// added for authentication
apiHelpers.getCsrfConfig = () => {
  return {
    withCredentials: true, //this needs to be done with separate front/back end
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken"),
    },
  };
};

//

apiHelpers.getImageUploadCsrfConfig = () => {
  return {
    withCredentials: true, //this needs to be done with separate front/back end
    headers: {
      "X-CSRFToken": Cookie.get("csrftoken"),
      "Content-Type": "multipart/form-data",
    },
  };
};

export default apiHelpers;
