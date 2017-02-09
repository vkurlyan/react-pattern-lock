/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import { connect } from 'react-redux';
import React from 'react';
import PatternLock from '../../components/PatternLock/';
import styled from 'styled-components';
import * as actions from './actions';
import Link  from '../../components/Link/'
import Title from '../../components/Title/';
import Error from '../../components/Error/';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor(props){
    super(props);
    this.onCircleSelected = this.onCircleSelected.bind(this);
    this.onPatternSelected = this.onPatternSelected.bind(this);
  }

  onCircleSelected(key) {
    this.props.dispatch(actions.circleIsSelected(key));
  }

  onPatternSelected() {
    this.props.dispatch(actions.patternIsSelected());
  }

  render() {
    const {pattern, errorMessage, isSync, isLoggedIn} = this.props;

    return isLoggedIn ? 
        <div>
          <Title>
              Wellcome to application
          </Title>
          <Link to="/change-pattern">
            Change pattern
          </Link>
        </div>	
      :
        <div>
          <Title>
              Please, unlock application
          </Title>
          <PatternLock 
            pattern={pattern}
            isSync={isSync}
            onCircleSelected={this.onCircleSelected}
            onPatternSelected={this.onPatternSelected}
          />
          <Error>{errorMessage}</Error>
        </div>
  }
}

const mapStateToProps = (state) => {
  const homePage = state.get('homePage');
  return {
    pattern: homePage.pattern,
    errorMessage: homePage.errorMessage,
    isSync: homePage.isSync,
    isLoggedIn: homePage.isLoggedIn
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);