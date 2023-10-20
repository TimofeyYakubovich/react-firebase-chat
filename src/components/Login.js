import { Container, Grid, Box, Button } from '@mui/material';
import React, { useContext } from 'react';
import { Context } from '..';
import firebase from "firebase/compat/app"; 
// страница с авторизацией с помощью гугла
const Login = () => {
    const {auth} = useContext(Context)

    // функция будет вызываться при нажатии на кнопку
    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider() // получаем провайдер авторзации это конструктор создаем объект
        // получаем пользователя после того как авторизовались
        const {user} = await auth.signInWithPopup(provider) // у объекта auth из контекста вызываем функцию signInWithPopup переадем provider
        console.log(user)
    }

    return (
        <Container>
            {/* window.innerHeight - 50 высота окна браузера - 50 высоты навбара */}
            <Grid 
                container 
                style={{height: window.innerHeight - 50}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid
                    style={{width: 400, background: "lightgray"}}
                    container
                    alignItems={"center"}
                    direction={'column'}
                >
                    <Box p={5}>
                        <Button 
                            onClick={login} 
                            style={{fontSize: "14px", color: 'black', borderColor: 'black'}} 
                            variant='outlined'
                        >Войти с помощью гугла
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Login;