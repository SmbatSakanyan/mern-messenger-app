import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Main from '../components/Main';

const MainPage = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <Main />
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(MainPage);