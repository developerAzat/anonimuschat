import React from "react";
import styles from "./ChatList.module.scss";

export interface props {
  mobileMod: Boolean;
  setChatListSelected?: Function;
}

function ChatList({ mobileMod, setChatListSelected }: props) {
  return <div className={styles.main}></div>;
}

export { ChatList };
