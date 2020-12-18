import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import PersonIcon from '@material-ui/icons/Person';

import { firestore } from '../../firebase';

import styles from './ChatList.module.scss';

interface props {
  userId: string;
  chatsSet: Set<string>;
  setSelectedChatId: Function;
}

function ChatList({ userId, chatsSet, setSelectedChatId }: props) {
  const chats = Array.from(chatsSet);

  const newChat = (userId: string) => () => {
    async function createChat(userId: string) {
      const requests = await firestore.collection('RequestToCreateChat').get();

      if (!requests.empty) {
        for (let index = 0; index < requests.docs.length; index++) {
          const element = requests.docs[index];
          const newChatUserId = element.data().UserId;

          if (newChatUserId !== userId) {
            const Chats = await firestore
              .collection('Chats')
              .where('Owners', 'array-contains-any', [userId])
              .get();
            let jointChat: boolean = false;

            Chats.docs.forEach((Chat) => {
              if (Chat.data().Owners.indexOf(newChatUserId) !== -1) {
                jointChat = true;
                console.log('Есть общий чат');
              }
            });

            if (!jointChat) {
              console.log('Создан новый чат');

              firestore.collection('RequestToCreateChat').doc(element.id).delete();
              firestore.collection('Chats').add({ Owners: [userId, newChatUserId] });
              return;
            }
          } else {
            console.log('Заявка уже существует');
            return;
          }
        }
        console.log('Чат не создан');
      }

      console.log('Создана новая заявка');

      firestore.collection('RequestToCreateChat').add({
        UserId: userId,
      });
    }

    createChat(userId);
  };

  return (
    <div className={styles.main}>
      <div className={styles.head}>
        <IconButton onClick={newChat(userId)}>
          <AddCircleIcon style={{ width: 30, height: 30 }} />
        </IconButton>
        <div>Начать новый диалог</div>
      </div>
      <div className={styles.list}>
        {chats.map((chatId) => {
          return (
            <Button key={chatId} onClick={() => setSelectedChatId(chatId)}>
              <div className={styles.item}>
                <div className={styles.iconWrap}>
                  <PersonIcon style={{ width: 28, height: 28 }} />
                </div>
                <div className={styles.text}>
                  <div className={styles.chatName}>{chatId}</div>
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
