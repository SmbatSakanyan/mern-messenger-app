import React from 'react';
// components
import ContactItem from './ContactItem';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: 'calc(100vh - 140px)',
    overflowY: 'auto',
    flewGrow: 1,
    padding: theme.spacing(0),
  },
}));

const ContactList = ({ contacts }) => {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {
        contacts.map(contact => (
        <ContactItem 
          key={contact}
          username={contact}
        />
      ))}
    </List>
  );
};

const mapStateToProps = state => ({
  contacts: state.contacts
});

export default connect(mapStateToProps)(ContactList);