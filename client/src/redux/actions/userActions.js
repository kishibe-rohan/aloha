import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    console.log(email);
    console.log(password);

    const { data } = await axios.post("/users/login", {
      email,
      password,
    });

    dispatch({
      type: "LOGIN_SUCCESS",
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: "LOGIN_FAILURE",
      payload: err.response.data.message,
    });
  }
};

//Register
export const register = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "REGISTER_REQUEST",
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/users/register", userInfo, config);

    dispatch({
      type: "REGISTER_SUCCESS",
      payload: data.user,
    });
  } catch (err) {
    dispatch({
      type: "REGISER_FAILURE",
      payload: err.response.data.messsage,
    });
  }
};

//Follow User
export const followUser = () => async (dispatch, followId, userId) => {
  try {
    await axios.put(`/users/follow/${followId}`, {
      userId: userId,
    });

    dispatch({
      type: "FOLLOW_USER_SUCCESS",
      payload: followId,
    });
  } catch (err) {
    dispatch({
      type: "FOLLOW_USER_FAILURE",
      payload: err,
    });
  }
};

//Follow Category

//Unfollow User
export const unfollowUser = () => async (dispatch, followId, userId) => {
  try {
    await axios.put(`/users/unfollow/${followId}`, {
      userId: userId,
    });

    dispatch({
      type: "UNFOLLOW_USER_SUCCESS",
      payload: followId,
    });
  } catch (err) {
    dispatch({
      type: "UNFOLLOW_USER_FAILURE",
      payload: err,
    });
  }
};

//Unfollow Category
