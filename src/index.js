import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// import firebase from "firebase";
// // firebase/firestore это бд с каторой будем взаимодействовать
// import 'firebase/firestore'
// // firebase/auth модуль для аутентификации
// import 'firebase/auth'
import firebase from "firebase/compat/app"; 
import "firebase/compat/auth"; 
import "firebase/compat/firestore";

// сконектимся с firebase
// const firebaseConfig = {
//   apiKey: "AIzaSyCw5TnTy7OQp96bsuqbhpvJj0Mse1oWKkI",
//   authDomain: "chat-react-1f891.firebaseapp.com",
//   projectId: "chat-react-1f891",
//   storageBucket: "chat-react-1f891.appspot.com",
//   messagingSenderId: "978500021114",
//   appId: "1:978500021114:web:27f2081c32e91b278a44c3",
//   measurementId: "G-WRPCRBSN3J"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

firebase.initializeApp({ // функция инициализации firebase
  apiKey: "AIzaSyCw5TnTy7OQp96bsuqbhpvJj0Mse1oWKkI",
  authDomain: "chat-react-1f891.firebaseapp.com",
  projectId: "chat-react-1f891",
  storageBucket: "chat-react-1f891.appspot.com",
  messagingSenderId: "978500021114",
  appId: "1:978500021114:web:27f2081c32e91b278a44c3",
  measurementId: "G-WRPCRBSN3J"
});

export const Context = createContext(null)

// 2 этих объекта понадобятся в компанентах прокидываем их через контекст
const auth = firebase.auth() // создаем объект с помощью каторгго будем авторизовываться вызывая функцию auth()
const firestore = firebase.firestore() // firestore объект для взаимодействия с бд noSQL

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
    
);

// Firebase это сервис каторый заменяет бекенд там есть авторизация real-time базы данных хранилище файлов 
// npm i react-router-dom firebase react-firebase-hooks
// firebase так как будем взаимодействовать с firebase
// react-firebase-hooks дя удобства разаработки конкретно в react этот модуль дает некаторые хуки для комфортного взаимодействия с авторизацией
// бд и тд.
