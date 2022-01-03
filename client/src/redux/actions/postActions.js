import axios from "axios";

//Fetch Feed Posts
export const feedPosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "FEED_POSTS_REQUEST",
    });

    const { data } = await axios.get(`/posts/feed/${id}`);

    dispatch({
      type: "FEED_POSTS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "FEED_POSTS_FAILURE",
    });
  }
};

//Fetch User Posts
export const profilePosts = (username) => async (dispatch) => {
  try {
    dispatch({
      type: "PROFILE_POSTS_REQUEST",
    });

    const { data } = await axios.get(`/posts/profile/${username}`);

    dispatch({
      type: "PROFILE_POSTS_SUCCESS",
      payload: data,
    });
  } catch (err) {
    dispatch({
      type: "PROFILE_POSTS_FAILURE",
    });
  }
};
