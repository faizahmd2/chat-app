import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css'

import { useState } from 'react';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, Avatar, ChatComponentProps, ConversationHeader, VoiceCallButton, VideoCallButton, InfoButton, Loader, Search, Sidebar, ConversationList, Conversation, AddUserButton, ArrowButton } from '@chatscope/chat-ui-kit-react'
import { db, tx, id } from '../services/instantdbService'
import { ChatComponet } from '../../types'
import { getMessageTime } from '../services/utility';
import { Users } from '../../types/schema';
import MyLoader from './loader';
import { useRouter } from 'next/navigation';

function ChatComponent(props: ChatComponet) {
  const [newMessage, setNewMessage] = useState('')
  const router = useRouter();

  let messagesQ = { $: { where: { conversationId: props.conversationId } } };
  let chatQ = { $: { where: { id: props.conversationId } } }
  const { data, isLoading } = db.useQuery({ messages: messagesQ, chats: chatQ })
  
  let userInfoIds = [props.currentUserId]
  if(data && data.chats && data.chats[0]) {
    if(data.chats[0].createrId === props.currentUserId) {
      userInfoIds.push(data.chats[0].recieverId)
    } else {
      userInfoIds.push(data.chats[0].createrId)
    }
  }
  let senderQ = { $: { where: { id: { in: userInfoIds }} } }
  const { data: userInfo,  isLoading: senderLoading } = db.useQuery({ users: senderQ })
  
  if(isLoading || senderLoading) return <MyLoader />

  if(data && data.chats && !data.chats[0]) {
    alert("Invalid Method");
    router.push(`/`);
    return;
  }

  const handleCreateNewUser = (e) => {
    router.push(`/`);
  }

  const handleListChats = () => {
    router.push(`/chat`);
  }

  const sendMessage = (conversationId: string, senderId: string, text: string) => {
      const message = {
        id: id(),
        conversationId,
        senderId,
        text,
        createdAt: new Date(),
        status: 'sent',
      };

      db.transact([
        tx.messages[message.id].update(message)
      ])
      setNewMessage('')
  };

  const { messages }= data
  let currentUser: Users | undefined, otherUser:Users | undefined;
  userInfo.users.forEach(u=> {
    if(u.id === props.currentUserId) currentUser = u;
    else otherUser = u;
  })

  return (
        <ChatContainer>
          {otherUser && <ConversationHeader key="1">
            <Avatar src={otherUser.avatarUrl || 'https://chatscope.io/storybook/react/assets/zoe-E7ZdmXF0.svg'} name={otherUser.name} />
            <ConversationHeader.Content userName={otherUser.name} info={getMessageTime(otherUser.createdAt)} />
            <ConversationHeader.Actions>
              <AddUserButton onClick={handleCreateNewUser} />
              <ArrowButton direction="left" onClick={handleListChats} />
            </ConversationHeader.Actions>
          </ConversationHeader>}
          <MessageList>
              {messages.map((msg) => (
                  <Message
                      key={msg.id}
                      model={{
                          message: msg.text,
                          sentTime: getMessageTime(msg.createdAt.toString()),
                          direction: msg.senderId === props.currentUserId ? 'outgoing' : 'incoming',
                          position: 'single'
                      }}
                  >
                      {currentUser && otherUser && <Avatar src={msg.senderId === props.currentUserId ? currentUser.avatarUrl : otherUser.avatarUrl } name={msg.senderId} />}
                  </Message>
              ))}
          </MessageList>
          
          <MessageInput
              value={newMessage}
              onChange={(e) => setNewMessage(e)}
              onSend={() => sendMessage(props.conversationId,props.currentUserId,newMessage)}
              placeholder="Type a message..."
          />   
        </ChatContainer>
  );
};

export default ChatComponent;
