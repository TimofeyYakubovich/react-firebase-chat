import React from 'react';
import { Container, Grid } from '@mui/material';
// если обновляяем страницу на долю секунды отрисовывает страницу с автроризацией затеме редиректит в чат 
// так как запрос на сервер заниммает некатрое время поэтому создадим компанент Loader и в это время будем отрисовывать его
const Loader = () => {
    return (
        <Container>
            <Grid 
                container 
                style={{height: window.innerHeight - 50}}
                alignItems={"center"}
                justifyContent={"center"}
            >
                <Grid
                    container
                    alignItems={"center"}
                    direction={'column'}
                >
                    <div className="lds-hourglass"></div>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Loader;