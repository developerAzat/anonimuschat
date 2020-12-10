import React, { useState } from 'react';
import cn from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import styles from './Chat.module.scss';

interface user {
  id: number;
  name: string;
}

interface messageInterface {
  messageId: number;
  fromUserId: number;
  text: string;
  date: number;
}

interface chatInterface {
  withUser: user;
  messages: Array<messageInterface>;
}

const getChat = (userId: number, chatId: number): chatInterface => {
  return {
    withUser: { id: 1, name: 'testUser' },
    messages: [
      { messageId: 1, fromUserId: 0, text: 'привет', date: 20000000000 },
      { messageId: 1, fromUserId: 1, text: 'привет', date: 10000000000 },
    ],
  };
};

interface props {
  mobileMod: boolean;
  userId: number;
  selectedChatId: number | null;
  resetSelectedChatId: Function;
}

function Chat({ mobileMod, userId, selectedChatId, resetSelectedChatId }: props) {
  const [newMessageText, setNewMessageText] = useState('');
  if (!selectedChatId) {
    return <div className={styles.empty}>Выберите чат слева или создайте новый</div>;
  }
  const { withUser, messages } = getChat(userId, selectedChatId);
  return (
    <div className={cn(styles.main, { [styles.mainMob]: mobileMod })}>
      <div className={styles.head}>
        {mobileMod ? (
          <ArrowBackIcon
            style={{ width: 28, height: 28 }}
            onClick={() => resetSelectedChatId()}
          />
        ) : null}
        <div className={styles.chatName}>{withUser.name}</div>
      </div>
      <div className={styles.messages}>
        <div className={styles.messagesList}>
          {messages.map((message) => {
            return (
              <div
                className={styles.message}
                style={{
                  flexDirection: message.fromUserId === userId ? 'row-reverse' : 'row',
                }}>
                {message.text}
              </div>
            );
          })}
        </div>
        <div className={styles.inputWrapper}>
          <TextField
            value={newMessageText}
            onChange={(event) => setNewMessageText(event.target.value)}
            multiline
            variant='outlined'
            rowsMax={4}
            classes={{ root: styles.input }}
          />
          <IconButton>
            <SendIcon style={{ width: 28, height: 28 }} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export { Chat };
