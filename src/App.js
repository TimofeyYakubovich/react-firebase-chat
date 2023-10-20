import React, { StrictMode, useContext } from 'react';
import { BrowserRouter } from "react-router-dom";
import Navbar1 from './components/Navbar1';
import AppRouter from './components/AppRouter';
import { Context } from './index';
import {useAuthState} from "react-firebase-hooks/auth";
import './App.css'
import Loader from './components/Loader';

const App = () => {
  const {auth} = useContext(Context) 
    // получаем пользователя из хука useAuthState параметром принимает объект с помощью каторго авторизовываемся
    // в случае если пользватель залогинин вернется объект с данными пользователя user если не залогинин вернется null
    // хук useAuthState возвращает кортеж из 3 элиментов loading это загружен user пользователь или нет error - объект с ошибкой
    const [user, loading, error] = useAuthState(auth)

    if (loading) {
      return (
        <Loader/>
      )
    }

  return (
    <StrictMode>
      <BrowserRouter> {/* что бы навигация по страницам была возможна все приложение оборачиваем в BrowserRouter */}
        <Navbar1/>
        <AppRouter/>
      </BrowserRouter>
    </StrictMode>
    
  );
};

export default App;
