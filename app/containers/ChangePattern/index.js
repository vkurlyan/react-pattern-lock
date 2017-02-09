/*
 *
 * ChangePattern
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import * as actions from './actions'
import Helmet from 'react-helmet';
import Title from '../../components/Title/';
import Error from '../../components/Error/';
import Message from '../../components/Message/';
import IfLoggedIn from '../IfLoggedIn/';
import PatternLock from '../../components/PatternLock/';
import Link  from '../../components/Link/'

export class ChangePattern extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
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
    const {pattern, errorMessage, message, isSync} = this.props;

    return (
      <IfLoggedIn>
        <Helmet
          title="Change Pattern"
          meta={[
            { name: 'description', content: 'You can change pattern on this page' },
          ]}
        />
        <Title>Change patter</Title>
        <PatternLock 
            pattern={pattern}
            isSync={isSync}
            onCircleSelected={this.onCircleSelected}
            onPatternSelected={this.onPatternSelected}
          />
        <Message>{message}</Message>
        <Error>{errorMessage}</Error>

        <Link to="/">Back</Link>
      </IfLoggedIn>
    );
  }
}

ChangePattern.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const changePattern = state.get('changePattern');
  return {
    pattern: changePattern.pattern,
    errorMessage: changePattern.errorMessage,
    message: changePattern.message,
    isSync: changePattern.isSync,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePattern);
