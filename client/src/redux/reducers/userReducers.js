export const userReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case "LOGIN_REQUEST":
    case "REGISTER_REQUEST":
      return {
        loading: true,
      };

    case "LOGIN_SUCCESS":
    case "REGISTER_SUCCESS":
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case "LOGIN_FAILURE":
    case "REGISTER_FAILURE":
      return {
        ...state,
        loading: false,
        user: null,
        error: action.payload,
      };

    case "FOLLOW_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };

    case "FOLLOW_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    case "UNFOLLOW_USER_SUCCESS":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following != action.payload
          ),
        },
      };

    case "UNFOLLOW_USER_FAILURE":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
