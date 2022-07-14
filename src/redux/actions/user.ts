import Axios from 'axios';

import { FAIL_USERS, USERS, CLEAR_ERRORS, LOAD_USERS } from '../constants/user';

export const getUsers: any = () => async (dispatch: any) => {
  dispatch({ type: LOAD_USERS });
  try {
    const result = await Axios.get(
      'https://jsonplaceholder.typicode.com/users',
    );
    dispatch({ type: USERS, payload: result.data });
  } catch (error: any) {
    dispatch({ type: FAIL_USERS, payload: error.response.data });
  }
};

export const clearErrors = () => async (dispatch: any) => {
  dispatch({ type: CLEAR_ERRORS });
};
