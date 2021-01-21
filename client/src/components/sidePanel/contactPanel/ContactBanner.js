import React, { useState } from 'react';
// redux
import { connect } from 'react-redux';
import { addContactToServer, searchUser } from '../../../actions/contacts';
// styles
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 70,
    padding: theme.spacing(0, 2),
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchForm: {
    display: 'flex',
    marginBottom: theme.spacing(2),
  },
  searchResult: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const ContactBanner = ({ username, contacts, addContactToServer }) => {
  const [open, setOpen] = useState(false);
  const [searchString, setSearchString] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSearchString('');
    setSearchResult(null);
  };

  const handleChange = event => {
    const { value } = event.target;
    setSearchString(value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    const userToAdd = searchString;
    const userExists = await searchUser(userToAdd);

    setSearchResult({ userExists, userToAdd });
  };

  const handleClickAdd = userToAdd => {
    addContactToServer(userToAdd);
    handleClose();
  };

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h6'>Contacts</Typography>
      
      <Tooltip title='Add new contact'>
        <IconButton onClick={handleClickOpen}>
          <PersonAddIcon />
        </IconButton>
      </Tooltip>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add new contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className={classes.searchForm}>
            <TextField
              autoFocus
              type='search'
              margin='dense'
              variant='outlined'
              placeholder='Search account'
              fullWidth
              value={searchString}
              onChange={handleChange}
            />
            <IconButton type='submit' color='primary'>
              <SearchIcon />
            </IconButton>
          </form>

          <div className={classes.searchResult}>
            {
              searchResult !== null && !searchResult.userExists && (
                <DialogContentText color='secondary'>
                  '{searchResult.userToAdd}' was not found.
                </DialogContentText>
              )
            }
            {
              searchResult !== null && searchResult.userExists && (
                <React.Fragment>
                  <Avatar>
                    {searchResult.userToAdd.charAt(0).toUpperCase()}
                  </Avatar>
                  <Typography variant='h6'>{searchResult.userToAdd}</Typography>
                </React.Fragment>
              )
            }
          </div>
        </DialogContent>
        {
          searchResult !== null && searchResult.userExists && (
            <DialogActions>
              <Button 
                color='primary'
                disabled={
                  searchResult.userToAdd === username 
                  || contacts.includes(searchResult.userToAdd)
                }
                onClick={() => handleClickAdd(searchResult.userToAdd)}
              >
                Add Contact
              </Button>
            </DialogActions>
          )
        }
      </Dialog>
    </div>
  );
};

const mapStateToProps = state => ({
  username: state.auth.username,
  contacts: state.contacts
});

export default connect(mapStateToProps, { addContactToServer })(ContactBanner);