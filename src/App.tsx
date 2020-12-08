import React, { useState } from "react";
import styles from "./App.module.scss";

import { Chat } from "./components/Chat";
import { ChatList } from "./components/ChatList";

function App() {
  const [mobileMod, setMobileMod] = useState(true);
  const [chatListSelected, setChatListSelected] = useState(true);

  if (window.innerWidth > 750) {
    setMobileMod(false);
  }

  return (
    <div className={styles.mainWindow}>
      {mobileMod ? (
        chatListSelected ? (
          <ChatList
            mobileMod={mobileMod}
            setChatListSelected={setChatListSelected}
          />
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
