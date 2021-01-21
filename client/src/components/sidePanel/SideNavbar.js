import React from 'react';
// redux
import { connect } from 'react-redux';
// styles
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import ChatIcon from '@material-ui/icons/Chat';
import PersonIcon from '@material-ui/icons/Person';
import Badge from '@material-ui/core/Badge';

const AntTab = withStyles({
  root: {
    minWidth: 'auto',
    height: 70,
    flexGrow: 1,
  },
})(Tab);

const useStyles = makeStyles(theme => ({
  root: {
    height: 70,
    flexShrink: 0,
    borderBottom: '1px solid #c4c4c4',
    [theme.breakpoints.down('xs')]: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
  },
}));

const SideNavbar = ({ tab, onChange, conversations }) => {
  const unreadMessages = conversations.reduce(
    (total, conversation) => total + (conversation.messages.length - conversation.lastMessageRead),
    0
  );

  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Tabs
        value={tab}
        onChange={onChange}
        indicatorColor='primary'
        textColor='primary'
      >
        <AntTab 
          icon={
            <Badge 
              color='secondary' 
              badgeContent={unreadMessages}
              invisible={unreadMessages === 0}
            >
              <ChatIcon />
            </Badge>
          } 
          disableRipple 
        />
        <AntTab icon={<PersonIcon />} disableRipple />
      </Tabs>
    </div>
  );
}

const mapStateToProps = state => ({
  conversations: state.conversations
});

export default connect(mapStateToProps)(SideNavbar);