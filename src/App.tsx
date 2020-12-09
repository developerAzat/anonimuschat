import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';

import { chatInterface } from './interfaces';

import styles from './App.module.scss';

let Chats: Array<chatInterface> = [
  { withUser: 'anonim123', lastMessage: 'q', fromThisUser: true, id: 1 },
  { withUser: 'anon', lastMessage: 'asd', fromThisUser: false, id: 2 },
  {
    withUser: 'anton',
    lastMessage: 'qwwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    fromThisUser: true,
    id: 3,
  },
  { withUser: 'zxc', lastMessage: 'q', fromThisUser: false, id: 4 },
  { withUser: 'anonim', lastMessage: 'q', fromThisUser: true, id: 5 },
  { withUser: 'anon123', lastMessage: 'q', fromThisUser: false, id: 6 },
];

function App() {
  const [mobileMod, setMobileMod] = useState(true);
  const [selectedChatId, setSelectedChatId] = useState(0);

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

  useEffect(() => {}, [selectedChatId]);

  return (
    <div
      className={cn(styles.mainWindow, {
        [styles.mainWindowMob]: mobileMod,
        [styles.mainWindowDesc]: !mobileMod,
      })}>
      {mobileMod ? (
        !selectedChatId ? (
          <ChatList setSelectedChatId={setSelectedChatId} chatList={Chats} />
        ) : (
          <Chat />
        )
      ) : (
        <>
          <ChatList setSelectedChatId={setSelectedChatId} chatList={Chats} />
          <Chat />
        </>
      )}
    </div>
  );
}

export default App;
