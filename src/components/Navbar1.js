import { AppBar, Grid, Toolbar, Button } from '@mui/material';
import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar1 = () => {
    // const user = false;
    const {auth} = useContext(Context) 
    // получаем пользователя из хука useAuthState параметром принимает объект с помощью каторго авторизовываемся
    // в случае если пользватель залогинин вернется объект с данными пользователя user если не залогинин вернется null
    const [user] = useAuthState(auth)

    return (
        <AppBar color={"error"} position="static">
        <Toolbar variant='dense'>
            {/* тут будет 2 кнопки с логином и разлогиниться */}
            <Grid container justifyContent={"flex-end"}>
                {user ? 
                    // что бы выйти из аккаунта вызываем у auth функцию signOut
                    <Button onClick={() => auth.signOut()} style={{fontSize: "16px", color: 'black', fontWeight: 600}} variant='outlined'>Выйти</Button>
                    :
                    <NavLink to={LOGIN_ROUTE}>  {/* что бы кнопка логин перевдил на страницу логина */}
                        <Button style={{fontSize: "14px", color: 'black', fontWeight: 700}} variant='outlined'>Логин</Button>
                    </NavLink>
                    
                }
            </Grid>
        </Toolbar>
        </AppBar>
    );
};

export default Navbar1;