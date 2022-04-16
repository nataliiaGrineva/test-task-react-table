import { GET_REGIONS_DATA, GET_COMMENTS_DATA, ADD_COMMENT } from './types';
import data from '../assets/testData.txt';

export const getRegionsData = (data) => ({ type: GET_REGIONS_DATA, payload: data });
export const getCommentsData = (comments) => ({ type: GET_COMMENTS_DATA, payload: comments });
export const addComment = (newComment) => ({ type: ADD_COMMENT, payload: newComment });

export const getData = () => async (dispatch) => {
  try {
    const response = await fetch(data);
    const text = await response.text();
    const json = JSON.parse(
      text
        .replace(/([a-zA-Z0-9]+)(?=\s*:)/g, '"$1"')
        .replace(/,(?!\s*")/g, '')
        .replace(/;/g, '')
    );

    dispatch(getRegionsData(json));
  } catch (error) {
    console.warn(error);
  }
};
