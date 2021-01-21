import React, { useEffect } from 'react';
// routes
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
// redux
import { connect } from 'react-redux';
import { verifyUser } from './actions/auth';
// styles
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline'

const useStyles = makeStyles({
  root: {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
});

const App = ({ verifyUser }) => {
  useEffect(() => {verifyUser()}, [verifyUser]);
  
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
        </Switch>
      </Router>
    </div>
  );
};

export default connect(null, { verifyUser })(App);
