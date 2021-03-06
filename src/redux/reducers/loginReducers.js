import {SET_USER_EMAIL, SET_USER_NAME} from '../actions/loginActions';

const initialState = {
  name: '',
  email: '',
};

function loginReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER_NAME:
      return {...state, name: action.payload};
    case SET_USER_EMAIL:
      return {...state, email: action.payload};
    default:
      return state;
  }
}

export default loginReducer