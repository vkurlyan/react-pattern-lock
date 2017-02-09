/*
 *
 * IfLoggedIn
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

export class IfLoggedIn extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const {children, isLoggedIn} = this.props;

    if (!isLoggedIn) {
      return (
        <div>Please, sign in to see this page</div>
      );
    }

    return (
      <div>
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const homePage = state.get('homePage');
  return {
    isLoggedIn: homePage.isLoggedIn
  }
};

export default connect(mapStateToProps)(IfLoggedIn);
