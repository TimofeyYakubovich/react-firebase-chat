import React, { useContext, useState } from 'react';
import { Context } from '../index';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollectionData} from "react-firebase-hooks/firestore";
import { Avatar, Button, Container, Grid, TextField } from '@mui/material';
import Loader from './Loader';
// компанент для страницы с чатом
const Chat = () => {
    const {auth, firestore, firebase} = useContext(Context)  // firestore объект для взаимодействия с бд
    // получаем пользователя из хука useAuthState параметром принимает объект с помощью каторго авторизовываемся
    // в случае если пользватель залогинин вернется объект с данными пользователя user если не залогинин вернется null
    const [user] = useAuthState(auth)
    const [value, setValue] = useState('')
    // хук useCollectionData с помощью него будем получаь сообщения возвращает кортеж messages - сообщение 
    // loading - загрузились сообщения или нет
    // параметром принимает запрос, запрос делаем с помощью firestore так как это noSQL бд она состоит из колекций в этом 
    // случае колеция называется messages collection('messages') и сделаем сортировку по полю создания сообщения функия orderBy('createdAt')
    const [messages, loading] = useCollectionData(
        firestore.collection('messages').orderBy('createdAt')
    )

    // функция оправки сообщения
    const sendMessage = async () => {
        // добвляем сообщения в бд
        // оброщаемся к колекции и у нее вызываем функцю add в нее передаем объект с любыми произвольными полями
        firestore.collection('messages').add({
            uid: user.uid, // id пользователя 
            displayName: user.displayName, // имя пользователя
            photoURL: user.photoURL, // ссылка на автарку пользователя
            text: value, // текст сообщения
            // дата отправки сообщения полчать время с самого компьютера не логично так как оно может быть неправильным
            // поэтому firebase предосталяет возможность получать время напрямую из сервера что бы у всех было одинаковое
            // у firebase.firestore берем поле FieldValue у него функцию serverTimestamp она вернет текущее время в милисекундах
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        })
        setValue('') // после отправки сообщения очищаем инпут
    }

    if (loading) { // если сообщения еще загружаются показываем лоудер
        return <Loader/>
    }

    return (
        <Container>
            <Grid 
                container 
                style={{height: window.innerHeight - 50, marginTop: '20px'}}
                justifyContent={"center"}
            >
                {/* блок с сообщениями */}
                <div style={{width: '80%', height: '70vh', border: '1px solid grey', overflowY: 'auto'}}>
                    {/* отрисовываем сообщения из messages */}
                    {messages.map(message => 
                        <div key={message.createdAt} style={{
                            margin: 10,
                            // если id текущего пользоваеля равно id каторый отправил сообщение тоесть мы от отрисовываем зелёную рамку
                            border: user.uid === message.uid ? '2px solid green' : '2px dashed red',
                            marginLeft: user.uid === message.uid ? 'auto' : '10px',
                            width: 'fit-content',
                            padding: 5
                        }}>
                            <Grid>
                                <Avatar src={message.photoURL}/>  {/* автврка пользоваеля */}
                                <div>{message.displayName}</div>
                            </Grid>
                            <div>{message.text}</div>
                        </div>
                    )}
                </div>
                {/* добавим инпут и кнопку внутри инпута пишем сообщение нажиаем на кнопку и сообщение будет улеать в чат */}
                <Grid
                        container
                        direction={"column"}
                        alignItems={"flex-end"}
                        style={{width: '80%'}}
                    >
                        <TextField 
                            variant='outlined'
                            fullWidth
                            rowsmax={2}
                            value={value}
                            onChange={e => setValue(e.target.value)}
                        />
                        <Button onClick={sendMessage} variant='outlined'>Отправить</Button>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Chat;