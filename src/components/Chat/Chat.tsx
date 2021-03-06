import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';

import { firestore } from '../../firebase';

import { chatInterface } from '../../App';

import styles from './Chat.module.scss';

interface props {
  mobileMod: boolean;
  userId: string;
  selectedChatId: string | null;
  currrentChat: chatInterface | null;
  resetSelectedChatId: Function;
}

/**
 * Компонет отрисовывающий чат
 * @param mobileMod описывает размер компонента
 * @param userId id пользователя
 * @param selectedChatId id выбранного чата
 * @param currrentChat выбранный чат
 * @param resetSelectedChatId функция для сброса выбраного чата
 */
function Chat({
  mobileMod,
  userId,
  selectedChatId,
  currrentChat,
  resetSelectedChatId,
}: props) {
  const [newMessageText, setNewMessageText] = useState('');
  const messagesRef = useRef<React.ElementRef<'div'> | null>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = Infinity;
    }
  }, [currrentChat?.Messages, messagesRef]);

  const sendMessage = () => {
    firestore.collection('Messages').add({
      ChatId: selectedChatId,
      Date: Date.now(),
      Text: newMessageText,
      UserId: userId,
    });
    setNewMessageText('');
  };

  if (!currrentChat) {
    return <div className={styles.empty}>Выберите чат слева или создайте новый</div>;
  }

  return (
    <div className={cn(styles.main)}>
      <div className={styles.head}>
        {mobileMod ? (
          <ArrowBackIcon
            style={{ width: 28, height: 28 }}
            onClick={() => resetSelectedChatId()}
          />
        ) : null}
        <div className={styles.chatName}>{selectedChatId}</div>
      </div>
      <div className={styles.messages} ref={messagesRef}>
        {currrentChat.Messages.map((message, index) => {
          return (
            <div
              className={styles.message}
              key={message.MessageID}
              style={{
                flexDirection: message.UserId === userId ? 'row-reverse' : 'row',
              }}>
              {message.Text}
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
        <IconButton onClick={sendMessage}>
          <SendIcon style={{ width: 28, height: 28 }} />
        </IconButton>
      </div>
    </div>
  );
}

export { Chat };
