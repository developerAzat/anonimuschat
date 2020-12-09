import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

import { chatInterface } from '../../interfaces';

import styles from './ChatList.module.scss';

interface props {
  setSelectedChatId: Function;
  chatList: Array<chatInterface>;
}

function ChatList({ setSelectedChatId, chatList }: props) {
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
            <Button key={value.id} onClick={() => setSelectedChatId(value.id)}>
              <div className={styles.item}>
                <div className={styles.iconWrap}>
                  <PersonIcon style={{ width: 28, height: 28 }} />
                </div>
                <div className={styles.text}>
                  <div className={styles.withUser}>{value.withUser}</div>
                  <div className={styles.lastMessage}>
                    {value.fromThisUser ? 'Вы: ' : ''}
                    {value.lastMessage}
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
