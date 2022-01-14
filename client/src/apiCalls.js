import axios from "axios";

export const loginCall = async (userInfo, dispatch) => {
  dispatch({ type: "LOGIN_START" });
  try {
    const res = await axios.post("/users/login", userInfo);
    dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "LOGIN_FAILURE", payload: err });
  }
};

export const registerCall = async (userInfo, dispatch) => {
  try {
    const res = await axios.post("/users/register", userInfo);
    dispatch({ type: "REGISTER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "REGISTER_FAILURE", payload: err });
  }
};
