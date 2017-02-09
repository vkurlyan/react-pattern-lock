import { createSelector } from 'reselect';

/**
 * Direct selector to the changePattern state domain
 */
const selectChangePatternDomain = () => (state) => state.get('changePattern');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ChangePattern
 */

const makeSelectChangePattern = () => createSelector(
  selectChangePatternDomain(),
  (substate) => substate.toJS()
);

export default makeSelectChangePattern;
export {
  selectChangePatternDomain,
};
