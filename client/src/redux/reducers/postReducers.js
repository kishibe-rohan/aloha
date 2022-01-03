export const postsReducer = (
  state = { feedPosts: [], profilePosts: [] },
  action
) => {
  switch (action.type) {
    case "FEED_POSTS_REQUEST":
      return {
        loading: true,
      };
    case "FEED_POSTS_SUCCESS":
      return {
        ...state,
        loading: false,
        feedPosts: action.payload,
      };
    case "FEED_POSTS_FAILURE":
      return {
        ...state,
        loading: false,
        feedPosts: null,
        error: action.payload,
      };
    case "PROFILE_POSTS_REQUEST":
      return {
        isLoading: true,
      };
    case "PROFILE_POSTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        profilePosts: action.payload,
      };
    case "PROFILE_POSTS_FAILURE":
      return {
        ...state,
        isLoading: false,
        profilePosts: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
