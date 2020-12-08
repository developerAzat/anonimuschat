import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';

import styles from './App.module.scss';

function App() {
  const [mobileMod, setMobileMod] = useState(true);
  const [chatListSelected, setChatListSelected] = useState(true);

  useEffect(() => {
    function onResize() {
      if (window.innerWidth < 900) {
        setMobileMod(true);
      } else {
        setMobileMod(false);
      }
    }
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div
      className={cn(styles.mainWindow, {
        [styles.mainWindowMob]: mobileMod,
        [styles.mainWindowDesc]: !mobileMod,
      })}>
      {mobileMod ? (
        chatListSelected ? (
          <ChatList mobileMod={mobileMod} setChatListSelected={setChatListSelected} />
        ) : (
          <Chat />
        )
      ) : (
        <>
          <ChatList mobileMod={mobileMod} />
          <Chat />
        </>
      )}
    </div>
  );
}

export default App;
