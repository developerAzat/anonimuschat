import React, { useState, useEffect } from 'react';
import cn from 'classnames';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { Chat } from './components/Chat';
import { ChatList } from './components/ChatList';

import styles from './App.module.scss';

firebase.initializeApp({
  apiKey: "AIzaSyCebvmsccLVl75ci5Abr7QP1UIEvg6FyfQ",
  authDomain: "anonimuschat-133c1.firebaseapp.com",
  projectId: "anonimuschat-133c1",
  storageBucket: "anonimuschat-133c1.appspot.com",
  messagingSenderId: "923891462008",
  appId: "1:923891462008:web:872a24174e95b0cdfbe28d"
});

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [userId, setUserId] = useState('');
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

  useEffect(() => {
    auth.signInAnonymously()
    .then((value)=>{
      if(value.user?.uid){
        setUserId(value.user.uid);
      }
    });
  }, []);

  useEffect(()=>{
    // firestore.collection('test').get()
    // .then((value)=>{
    //   console.log(value.docs[0].data());
    // })

    // if(userId){
    //   firestore.collection('users').doc(userId).get()
    //   .then((value)=>{
    //     console.log(value.data());
    //   })
    // }
    

    // firestore.collection("test").add({
    //   first: "Ada",
    //   last: "Lovelace",
    //   born: 1815,
    // })
    // .then(function(docRef) {
    //     console.log("Document written with ID: ", docRef.id);
    // })
    // .catch(function(error) {
    //     console.error("Error adding document: ", error);
    // });

    // if(userId){
    //   firestore.collection("users").doc(userId).set({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815,
    //   })
    // }
    
    // if(userId){
    //   firestore.collection("test").doc('qwe').set({
    //     first: "Ada12",
    //     last: "Lovelace",
    //     born: 1815,
    //     userId: userId,
    //   })
    // }
    

    // if(auth.currentUser){
    //   firestore.collection("test").add({
    //     first: "Ada",
    //     last: "Lovelace",
    //     born: 1815,
    //     userId: auth.currentUser.uid
    //   })
    //   .then(function(docRef) {
    //       console.log("Document written with ID: ", docRef.id);
    //   })
    //   .catch(function(error) {
    //       console.error("Error adding document: ", error);
    //   });
    // }


    // firestore.collection("test").where("first", "!=", '').get()
    // .then((querySnapshot) => {
    //     querySnapshot.forEach(function(doc) {
    //         // doc.data() is never undefined for query doc snapshots
    //         console.log(doc.id, " => ", doc.data());
    //     });
    // })
    // .catch(function(error) {
    //     console.log("Error getting documents: ", error);
    // });


    // firestore.collection("test")
    // .onSnapshot((collection) => {
    //   collection.forEach((doc) => {
    //       // doc.data() is never undefined for query doc snapshots
    //       console.log(doc.id, " => ", doc.data());
    //   });
    // });

    

  }, [userId])
  
  

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
