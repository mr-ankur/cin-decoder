import { applyMiddleware, createStore, combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import thunk from 'redux-thunk'
import cinReducer from './reducers/cinReducer'
import authReducer from './reducers/authReducer'

const rootReducer = combineReducers({
  cinReducer: cinReducer,
  authReducer: authReducer,
  form: formReducer,
});

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}