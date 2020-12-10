import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';

import styles from './App.module.scss';

function App() {
  const [userId, setUserId] = useState(0);
  const [selectedChatId, setSelectedChatId] = useState(null);

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

  const resetSelectedChatId = () => {
    setSelectedChatId(null);
  };

  return (
    <div
      className={cn(styles.mainWindow, {
        [styles.mainWindowMob]: mobileMod,
        [styles.mainWindowDesc]: !mobileMod,
      })}>
      {mobileMod ? (
        !selectedChatId ? (
          <ChatList userId={userId} setSelectedChatId={setSelectedChatId} />
        ) : (
          <Chat
            mobileMod={mobileMod}
            userId={userId}
            selectedChatId={selectedChatId}
            resetSelectedChatId={resetSelectedChatId}
          />
        )
      ) : (
        <>
          <ChatList userId={userId} setSelectedChatId={setSelectedChatId} />
          <Chat
            mobileMod={mobileMod}
            userId={userId}
            selectedChatId={selectedChatId}
            resetSelectedChatId={resetSelectedChatId}
          />
        </>
      )}
    </div>
  );
}

export default App;
