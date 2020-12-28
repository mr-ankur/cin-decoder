import {
  GET_CIN_SEARCH_SUCCESS,
  GET_SEARCH_HISTORY_SUCCESS,
} from "../constants/cinConstants";

const initialState = {
  cin: null,
  search_history: null,
};

export default function cinReducer (state = initialState, action) {
  switch (action.type) {
    case GET_CIN_SEARCH_SUCCESS:
      return { ...state, cin: action.data && action.data.cin };
    case GET_SEARCH_HISTORY_SUCCESS:
      return {
        ...state,
        search_history: action.data && action.data.search_history,
      };
    default:
      return state;
  }
};

