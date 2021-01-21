import React from 'react';
// components
import ConversationItem from './ConversationItem';
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

const ConversationList = ({ conversations }) => {
  
  const classes = useStyles();
  return (
    <List className={classes.root}>
      {
        conversations.map(conversation => (
        <ConversationItem 
          key={conversation._id}
          conversation={conversation}
        />
      ))}
    </List>
  );
};

const mapStateToProps = state => ({
  conversations: state.conversations
});

export default connect(mapStateToProps)(ConversationList);