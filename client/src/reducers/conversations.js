import {
  SET_CONVERSATIONS,
  CLEAR_CONVERSATIONS,
  ADD_CONVERSATION,
  ADD_PARTICIPANTS,
  ADD_MESSAGE,
  UPDATE_LAST_MESSAGE_READ
} from '../actions/actionTypes';

const defaultState = [];

const conversations = (state = defaultState, action) => {
  switch (action.type) {
    case SET_CONVERSATIONS:
      return action.conversations.sort(compare);
    case CLEAR_CONVERSATIONS:
      return [];
    case ADD_CONVERSATION:
      return [...state, action.conversation].sort(compare);
    case ADD_PARTICIPANTS:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            participants: [...conversation.participants, ...action.participants].sort()
          };
        }
        return conversation;
      });
    case ADD_MESSAGE:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            messages: [...conversation.messages, action.message]
          };
        }
        return conversation;
      }).sort(compare);
    case UPDATE_LAST_MESSAGE_READ:
      return state.map(conversation => {
        if (conversation._id === action._id) {
          return {
            ...conversation,
            lastMessageRead: action.lastMessageRead
          };
        }
        return conversation
      });
    default:
      return state;
  }
};

const compare = (c1, c2) => {
  const c1NumMsgs = c1.messages.length;
  const c2NumMsgs = c2.messages.length;
  if (!c2NumMsgs) return 1;
  if (!c1NumMsgs) return -1;

  const c1Date = c1.messages[c1NumMsgs - 1].date;
  const c2Date = c2.messages[c2NumMsgs - 1].date;

  if (c1Date > c2Date) return -1;
  if (c1Date < c2Date) return 1;
  return 0;
};

export default conversations;