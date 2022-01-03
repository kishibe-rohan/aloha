export const categoryReducer = (state = { categories: [] }, action) => {
  switch (action.type) {
    case "GET_CATEGORIES_REQUEST":
      return {
        loading: true,
      };

    case "GET_CATEGORIES_SUCCESS":
      return {
        ...state,
        loading: false,
        categories: action.payload,
      };

    case "GET_CATEGORIES_FAILURE":
      return {
        ...state,
        loading: false,
        categories: null,
        error: action.payload,
      };

    default:
      return state;
  }
};
