import actions from './constants';
import { resolve, reject } from 'redux-simple-promise';

const initialState = {pattern:[]};

export const circleIsSelected = (state, action) => {
  let pattern = [...state.pattern];
  pattern.push(action.key);
  return {
    ...state,
    errorMessage: null,
    pattern
  };
}

export const patternError = (state, action) => {
  return {
    ...state,
    pattern: [],
    previousPattern: null,
    errorMessage: action.message,
    message: null,
  };
}

function homePageReducer(state = initialState, action) {
  let data;
  switch (action.type) {

    case resolve(actions.FETCH_INITIAL_DATA):
      data = action.payload.data || {};
      return {
        ...state,
        isLoggedIn: data.isLoggedIn,
        isInitialDataFetched: true,
      };

    case actions.CIRCLE_IS_SELECTED:
    	return circleIsSelected(state, action);

    case actions.LOGIN:
      return {
        ...state,
        isSync: true
      };

    case resolve(actions.LOGIN):
      data = action.payload.data || {};
      return {
        ...state,
        pattern: [],
        isLoggedIn: data.isLoggedIn,
        errorMessage: data.message,
        isSync: false
      };

    case reject(actions.LOGIN):
      return {
        ...state,
        pattern: [],
        isSync: false,
        errorMessage: "Bad request. Please, check internet connection"
      };

    case actions.PATTERN_ERROR:
      return patternError(state, action);
    
    default:
      return state;
  }
}

export default homePageReducer;
