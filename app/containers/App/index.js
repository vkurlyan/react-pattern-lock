/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import { connect } from 'react-redux';

class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    // wait untill initial data will be fetched
    if (!this.props.isInitialDataFetched) {
      return null;
    }

    return (
      <div className="app-content">
        {React.Children.toArray(this.props.children)}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const homePage = state.get('homePage');
  return {
    isInitialDataFetched: homePage.isInitialDataFetched,
  }
};

export default connect(mapStateToProps)(App);