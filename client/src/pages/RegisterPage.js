import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import { register } from '../actions/auth';
import { clearError } from '../actions/error';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import WarningIcon from '@material-ui/icons/Warning';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import OutlinedInput from '@material-ui/core/OutlinedInput';
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

const RegisterPage = ({ isAuthenticated, error, register, clearError }) => {
  const classes = useStyles();
  useEffect(() => {
    return () => clearError();
  }, [clearError]);
  const [input, setInput] = useState({
    username: '', 
    password: '' ,
    confirmPassword: ''
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
    register(input);
  };

  const passwordsMatch = () => {
    return !input.confirmPassword || input.confirmPassword === input.password;
  };

  return (
    <Fragment>
      <Container maxWidth='xs' className={classes.root}>
        <div className={classes.title}>
          <PersonAddIcon className={classes.titleIcon} color='primary' />
          <Typography variant="h5">Register</Typography>
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
          <FormControl 
            variant='outlined' 
            margin='dense'
            fullWidth
            error={!passwordsMatch()}
          >
            <OutlinedInput 
              type='password'
              name='confirmPassword'
              value={input.confirmPassword}
              onChange={handleChange}
              placeholder='Confirm password'
              required
            />
            {!passwordsMatch() && (
              <FormHelperText>Your passwords don't match</FormHelperText>
            )}
          </FormControl>
          <Button
            type='submit'
            disabled={
              !input.username 
              || !input.password 
              || !input.confirmPassword 
              || !passwordsMatch()
            }
            fullWidth
            variant='contained'
            color='primary'
            className={classes.submit}
          >
            Register
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
            <Link component={RouterLink} to='/login'>
              Already have an account? Login
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

export default connect(mapStateToProps, { register, clearError })(RegisterPage);