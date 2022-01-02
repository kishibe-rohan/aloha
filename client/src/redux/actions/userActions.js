import axios from "axios";

//Login
export const login = (userInfo) => async (dispatch) => {
  try {
    dispatch({
      type: "LOGIN_REQUEST",
    });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post("/users/login", userInfo, config);

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
      payload: error.response.data.messsage,
    });
  }
};
