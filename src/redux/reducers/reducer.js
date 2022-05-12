import {GET_ANIMAL, SET_FAVOURITE} from '../actions/actions';

const initialState = {
  animals: [],
  favouriteAnimals: [],
};

function animalReducer(state = initialState, {type, payload}) {
  switch (type) {
    case GET_ANIMAL:
      return {...state, animals: payload};
    case SET_FAVOURITE:
      return {
        ...state,
        favouriteAnimals: state.favouriteAnimals.find(t => t === payload)
          ? state.favouriteAnimals.filter(t => t !== payload)
          : [...state.favouriteAnimals, payload],
      };
    default:
      return state;
  }
}

export default animalReducer;
