/*
 *
 * ChangePattern reducer
 *
 */

import {patternError, circleIsSelected} from '../HomePage/reducer';
import actions from './constants';
import { resolve, reject } from 'redux-simple-promise';

const initialState = {pattern:[]};

function changePatternReducer(state = initialState, action) {
	let data;

  switch (action.type) {
    case actions.CIRCLE_IS_SELECTED:
    	return circleIsSelected(state, action);

    case actions.ADD_FIRST_PATTERN:
		return {
			...state,
			message: 'Please, confirm pattern',
			previousPattern: state.pattern,
			pattern: [],
		};

    case actions.CHANGE_PATTERN:
		return {
			...state,
        	message: null,
			isSync: true
		};

    case resolve(actions.CHANGE_PATTERN):
		data = action.payload.data || {};
		return {
			...state,
			pattern: [],
        	previousPattern: null,
			errorMessage: data.errorMessage,
			message: data.message,
			isSync: false
		};

    case reject(actions.CHANGE_PATTERN):
      return {
        ...state,
        pattern: [],
        previousPattern: null,
        isSync: false,
        errorMessage: "Bad request. Please, check internet connection"
      };

    case actions.PATTERN_ERROR:
      return patternError(state, action);

    default:
      return state;
  }
}

export default changePatternReducer;
