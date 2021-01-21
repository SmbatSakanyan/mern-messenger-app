import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { login } from '../actions/auth';
import { clearError } from '../actions/error';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ChatIcon from '@material-ui/icons/Chat';
import WarningIcon from '@material-ui/icons/Warning';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    display: 'flex',
    alignItems: 'center',
  },
  titleIcon: {
    fontSize: 35,
    marginRight: theme.spacing(1.5),
  },
  errorMessage: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  errorIcon: {
    marginRight: theme.spacing(1.5),
  },
  form: {
    marginTop: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  footer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
}));

const LoginPage = ({ isAuthenticated, error, login, clearError }) => {
  const classes = useStyles();  
  useEffect(() => {
    return () => clearError();
  }, [clearError]);
  const [input, setInput] = useState({
    username: '', 
    password: '' 
  });

  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  const handleChange = event => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    login(input);
  };

  return (
    <Fragment>
      <Container maxWidth='xs' className={classes.root}>
        <div className={classes.title}>
          <ChatIcon className={classes.titleIcon} color='primary' />
          <Typography variant="h5">Messenger</Typography>
        </div>
        {
          error.message && (
            <div className={classes.errorMessage}>
              <WarningIcon color='secondary' className={classes.errorIcon} />
              <Typography variant='subtitle1' color='secondary'>
                {error.message}
              </Typography>
            </div>
          )
        }
        <form onSubmit={handleSubmit} className={classes.form}>
          <TextField 
            type='text'
            name='username'
            value={input.username}
            onChange={handleChange}
            variant='outlined'
            placeholder='Username'
            margin='dense'
            required
            fullWidth
            autoFocus
          />
          <TextField 
            type='password'
            name='password'
            value={input.password}
            onChange={handleChange}
            variant='outlined'
            placeholder='Password'
            margin='dense'
            required
            fullWidth
          />
          <Button
            type='submit'
            disabled={!input.username || !input.password}
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Login
          </Button>
        </form>
        <div className={classes.footer}>
          <Typography>
            <Link 
              href='https://github.com/SmbatSakanyan'
              target='blank'
            >
              My GitHub
            </Link>
          </Typography>
          <Typography>
            <Link component={RouterLink} to='/register'>
              Don't have an account? Register
            </Link>
          </Typography>
        </div>
      </Container>
      <div />
    </Fragment>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(mapStateToProps, { login, clearError })(LoginPage);