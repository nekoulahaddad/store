// An higher-order component to make sure user has logged in
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

  class Authentication extends Component {

    static contextTypes = {
      router: PropTypes.object
    };

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.history.replace('/SignIn', { time: new Date().toLocaleString(), message: 'Please sign in first.'});
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.history.replace('/SignIn', { time: new Date().toLocaleString(), message: 'Please sign in first.'});
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}