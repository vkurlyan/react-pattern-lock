/*
 *
 * ChangePattern actions
 *
 */

import actions from './constants';
import {isPatternValid} from '../../utils/validator.js';
import axios from 'axios';

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

export const changePattern = (pattern) => {
	return {
	    type: actions.CHANGE_PATTERN,
	    payload: {
	      promise: axios.post('/api/change-pattern', {
		    pattern,
		  }),
	    }
  	};
}

export const addFirstPattern = () => {
	return {
		type: actions.ADD_FIRST_PATTERN
	}
}

export const patternIsSelected = () => (dispatch, getState) => {
	const state = getState().get('changePattern');
	const pattern = state.pattern;
	const previousPattern = state.previousPattern;

	// Check first pattern
	if (!previousPattern) {
		if (isPatternValid(pattern)) {
			dispatch(addFirstPattern());
		} else {
			dispatch(patternError("Pattern is too short. Please, try again"));
		}
		return;
	}

	// Second pattern is entered
	if (pattern.join(',') === previousPattern.join(',')) {
		dispatch(changePattern(pattern));
	} else {
		dispatch(patternError("Patterns are not match. Please, enter new one"));
	}
}

