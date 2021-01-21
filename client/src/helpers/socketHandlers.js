import store from '../store';

export const handleNewConversation = (
  data, 
  addConversationWrapper
) => {
  const username = store.getState().auth.username;

  if (!data.participants.includes(username)) return;

  const participants = data.participants.filter(
    participant => participant !== username
  ).sort();

  const conversation = {
    ...data,
    participants
  };
  addConversationWrapper(conversation);
};

export const handleNewMessage = async (
  data, 
  addMessageWrapper,
  updateLastMessageReadToServer
) => {
  const { _id, message } = data;
  addMessageWrapper(_id, message);

  const { conversations, currentConversation } = store.getState();

  if (_id === currentConversation) {
    const lastMessageRead = conversations.find(
      conversation => conversation._id === _id
    ).messages.length;
    await updateLastMessageReadToServer(_id, lastMessageRead);
  }
};