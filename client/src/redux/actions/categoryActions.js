import axios from "axios";

export const getCategories = () => async (dispatch) => {
  try {
    dispatch({
      type: "GET_CATEGORIES_REQUEST",
    });

    const { data } = await axios.get("/category/all");
    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: data.categories,
    });
  } catch (err) {
    dispatch({
      type: "GET_CATEGORIES_FAIL",
      payload: err.resposne.data.message,
    });
  }
};
