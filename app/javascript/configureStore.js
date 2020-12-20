import { applyMiddleware, createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from 'redux-thunk'

const initialState = {
  cin: null,
  search_history: null,
};

const cinReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CIN_SEARCH_SUCCESS":
      return { ...state, cin: action.data && action.data.cin };
    case "GET_SEARCH_HISTORY_SUCCESS":
      return {
        ...state,
        search_history: action.data && action.data.search_history,
      };
    default:
      return state;
  }
};


const rootReducer = combineReducers({
  cinReducer: cinReducer,
  form: formReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}