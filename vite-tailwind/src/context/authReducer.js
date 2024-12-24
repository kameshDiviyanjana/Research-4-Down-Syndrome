import { AUTH_TYPES } from "./authTypes";

export const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  role: null,
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_TYPES.INITIALIZE:
      return {
        ...state,
        isInitialized: true,
        isAuthenticated: action.payload.isAuthenticated,
        user: action.payload.user,
        loading: false,
      };

    case AUTH_TYPES.LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case AUTH_TYPES.LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        token: action.payload.token,
        role: action.payload.role,
        loading: false,
        error: null,
      };

    case AUTH_TYPES.LOGIN_FAILURE:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        token: null,
        role: null,
        loading: false,
        error: action.payload,
      };

    case AUTH_TYPES.LOGOUT:
      return {
        ...initialState,
        isInitialized: true,
        loading: false,
      };

    case AUTH_TYPES.UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};
