import { applyMiddleware, createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from 'redux-thunk'
import cinReducer from './reducers/cinReducer'

const rootReducer = combineReducers({
  cinReducer: cinReducer,
  form: formReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}