import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

import styles from './ChatList.module.scss';

interface user {
  id: string;
  name: string;
}

interface messageInterface {
  messageId: string;
  fromUserId: string;
  text: string;
  date: number;
}

interface chatInfoInterface {
  chatId: string;
  withUser: user;
  lastMessage: messageInterface;
}

const getChats = (userId: string): Array<chatInfoInterface> => {
  return [
    {
      chatId: '1',
      withUser: { id: '1', name: 'anon' },
      lastMessage: { messageId: '1', fromUserId: '1', text: 'qwe', date: 1234 },
    },
    {
      chatId: '2',
      withUser: { id: '2', name: 'anonqwe' },
      lastMessage: { messageId: '2', fromUserId: '0', text: 'qwerty', date: 1234 },
    },
    {
      chatId: '3',
      withUser: { id: '3', name: 'anon1' },
      lastMessage: { messageId: '3', fromUserId: '0', text: 'qwe', date: 1234 },
    },
    {
      chatId: '4',
      withUser: { id: '4', name: 'anon2' },
      lastMessage: { messageId: '4', fromUserId: '0', text: 'qwe', date: 1234 },
    },
    {
      chatId: '5',
      withUser: { id: '5', name: 'anon3' },
      lastMessage: { messageId: '5', fromUserId: '0', text: 'qwe', date: 1234 },
    },
  ];
};

interface props {
  userId: string;
  setSelectedChatId: Function;
}

function ChatList({ userId, setSelectedChatId }: props) {
  const chatList = getChats(userId);
  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <IconButton>
          <AddCircleIcon style={{ width: 30, height: 30 }} />
        </IconButton>
        <div>Начать новый диалог</div>
      </div>
      <div className={styles.list}>
        {chatList.map((value) => {
          return (
            <Button key={value.chatId} onClick={() => setSelectedChatId(value.chatId)}>
              <div className={styles.item}>
                <div className={styles.iconWrap}>
                  <PersonIcon style={{ width: 28, height: 28 }} />
                </div>
                <div className={styles.text}>
                  <div className={styles.userName}>{value.withUser.name}</div>
                  <div className={styles.lastMessage}>
                    {value.lastMessage.fromUserId === userId ? 'Вы: ' : ''}
                    {value.lastMessage.text}
                  </div>
                </div>
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export { ChatList };
