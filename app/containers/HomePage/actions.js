import actions from './constants';
import {isPatternValid} from '../../utils/validator.js';
import axios from 'axios';

export const fetchInitialData = () => {
	return {
	    type: actions.FETCH_INITIAL_DATA,
	    payload: {
	      promise: axios.get('/api/initial-data'),
	    }
  	};
};

export const circleIsSelected = (key) => {
  return {
    type: actions.CIRCLE_IS_SELECTED,
    key,
  }
}

export const patternError = (message) => {
  return {
    type: actions.PATTERN_ERROR,
    message,
  }
}

export const login = (pattern) => {
	return {
	    type: actions.LOGIN,
	    payload: {
	      promise: axios.post('/api/login', {
		    pattern,
		  }),
	    }
  	};
}

export const patternIsSelected = () => (dispatch, getState) => {
	const pattern = getState().get('homePage').pattern;

	if (isPatternValid(pattern)) {
		dispatch(login(pattern));
	} else {
		dispatch(patternError("Invalid pattern. Please, try again"));
	}
}
