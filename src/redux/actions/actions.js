import axios from 'axios';
import {configureResponse} from '../../helper';

export const GET_ANIMAL = 'GET_ANIMAL';
export const SET_FAVOURITE = 'SET_FAVOURITE';
export const SEARCH_ANIMAL = 'SEARCH_ANIMAL';

export const getAnimal = () => async (dispatch, getState) => {
  try {
    const res = await axios.get('https://dog.ceo/api/breeds/list/all');

    const animals = configureResponse(res.data.message);
    dispatch({
      type: GET_ANIMAL,
      payload: animals,
    });

    getState();
  } catch (error) {
    console.log(error);
  }
};

export const setFavourite = favourite => dispatch => {
  dispatch({
    type: SET_FAVOURITE,
    payload: favourite,
  });
};

