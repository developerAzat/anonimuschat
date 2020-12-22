import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';

import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';

import styles from './App.module.scss';

import { auth, firestore } from './firebase';

/** Описание сообщения в чате */
export interface messageInterface {
  /** id сообщения */
  MessageID: string;
  /** id пользователя, который отправил сообщение*/
  UserId: string;
  /** текст сообщения */
  Text: string;
  /** дата отправки, в милисекундах */
  Date: number;
}

/** Описание чата */
export interface chatInterface {
  /** массив сообщений реализующих messageInterface */
  Messages: Array<messageInterface>;
  /** функция, при вызове которой прекратится вызов callback при обновлении данных в firebase */
  OnSnapshotUnsubscribe: Function;
}

/** Корневой компонент приложения */
function App() {
  const [userId, setUserId] = useState<string | null>(null);
  const [chatsSet, setChatsSet] = useState(new Set<string>());
  const chatsMapRef = useRef(new Map<string, chatInterface>());
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [currrentChat, setCurrentChat] = useState<chatInterface | null>(null);

  const [newMessageInChatId, setNewMessageInChatId] = useState<any>(null);

  const [mobileMod, setMobileMod] = useState(true);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth < 700) {
        setMobileMod(true);
      } else {
        setMobileMod(false);
      }
    }
    onResize();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    auth.signInAnonymously().then((value) => {
      if (value.user?.uid) {
        setUserId(value.user.uid);
      }
    });
  }, []);

  // подписка на обновление списка чатов
  useEffect(() => {
    if (userId) {
      firestore
        .collection('Chats')
        .where('Owners', 'array-contains-any', [userId])
        .onSnapshot((chats) => {
          const newChatSet = new Set<string>();
          for (let index = 0; index < chats.docs.length; index++) {
            newChatSet.add(chats.docs[index].id);
          }
          setChatsSet(newChatSet);
        });
    }
  }, [userId]);

  // подписка на обновление сообщений в чатах
  useEffect(() => {
    if (userId) {
      chatsSet.forEach((chatId) => {
        if (!chatsMapRef.current.has(chatId)) {
          const OnSnapshotUnsubscribe = firestore
            .collection('Messages')
            .where('ChatId', '==', chatId)
            .orderBy('Date')
            .onSnapshot((messages) => {
              const chat = chatsMapRef.current.get(chatId);
              if (chat !== undefined) {
                const messagesArray = Array.from(messages.docs.values());
                const newMessages = Array<messageInterface>(messagesArray.length);
                for (let index = 0; index < messagesArray.length; index++) {
                  const message = messagesArray[index].data();
                  // обратный порядок
                  newMessages[messagesArray.length - index - 1] = {
                    MessageID: messagesArray[index].id,
                    UserId: message.UserId,
                    Text: message.Text,
                    Date: message.Date,
                  };
                }
                chat.Messages = newMessages;
                // обновление состояние для перерисовки компонентов
                setNewMessageInChatId(newMessages);
              }
            });
          chatsMapRef.current.set(chatId, {
            Messages: [],
            OnSnapshotUnsubscribe,
          });
        }
      });
    }
  }, [userId, chatsSet, chatsMapRef]);

  useEffect(() => {
    if (selectedChatId) {
      const chat = chatsMapRef.current.get(selectedChatId);
      if (chat) {
        setCurrentChat(chat);
      }
    } else {
      setCurrentChat(null);
    }
  }, [selectedChatId]);

  const resetSelectedChatId = () => {
    setSelectedChatId(null);
  };

  if (!userId) {
    return <div>загрузка...</div>;
  }

  return (
    <div
      className={cn(styles.mainWindow, {
        [styles.mainWindowMob]: mobileMod,
        [styles.mainWindowDesc]: !mobileMod,
      })}>
      {mobileMod ? (
        !selectedChatId ? (
          <ChatList
            userId={userId}
            chatsSet={chatsSet}
            setSelectedChatId={setSelectedChatId}
          />
        ) : (
          <Chat
            mobileMod={mobileMod}
            userId={userId}
            selectedChatId={selectedChatId}
            currrentChat={currrentChat}
            resetSelectedChatId={resetSelectedChatId}
          />
        )
      ) : (
        <>
          <ChatList
            userId={userId}
            chatsSet={chatsSet}
            setSelectedChatId={setSelectedChatId}
          />
          <Chat
            mobileMod={mobileMod}
            userId={userId}
            selectedChatId={selectedChatId}
            currrentChat={currrentChat}
            resetSelectedChatId={resetSelectedChatId}
          />
        </>
      )}
    </div>
  );
}

export default App;
