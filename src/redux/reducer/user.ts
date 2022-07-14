// import types
const {
  USERS,
  LOAD_USERS,
  FAIL_USERS,
  CLEAR_ERRORS,
} = require('../constants/user');

// initialstate
const initialState = {
  dataUsers: [],
  errorUsers: '',
  success: '',
  loadingUsers: false,
};

const userReducer = (state = initialState, { type, payload }: any) => {
  switch (type) {
    case LOAD_USERS:
      return { ...state, loadingUsers: true };
    case USERS:
      return { ...state, dataUsers: payload, loadingUsers: false };
    case FAIL_USERS:
      return { ...state, errorUsers: payload, loadingUsers: false };
    case CLEAR_ERRORS:
      return { ...state, errorUsers: '' };
    default:
      return state;
  }
};

export default userReducer;
