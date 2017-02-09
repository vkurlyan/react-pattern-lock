
import { fromJS } from 'immutable';
import changePatternReducer from '../reducer';

describe('changePatternReducer', () => {
  it('returns the initial state', () => {
    expect(changePatternReducer(undefined, {})).toEqual(fromJS({}));
  });
});
