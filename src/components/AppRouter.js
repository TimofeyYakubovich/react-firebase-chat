import React, { useContext } from 'react';
// import { Routes, Route, Navigate, Switch, Redirect } from 'react-router-dom';
import { Routes, Route, Navigate } from 'react-router-dom';
import { privateRoutes, publicRoutes } from '../routes';
import { CHAT_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { Context } from '../index';
import {useAuthState} from "react-firebase-hooks/auth";
// компанент AppRouter сдесь будут описаны все маршруты по каторым можно будет переходить в приложении
const AppRouter = () => {
    // const user = true; // если user = true то пользователь авторизован если false не авторизован
    const {auth} = useContext(Context) 
    // получаем пользователя из хука useAuthState параметром принимает объект с помощью каторго авторизовываемся
    // в случае если пользватель залогинин вернется объект с данными пользователя user если не залогинин вернется null
    const [user] = useAuthState(auth)
    console.log(user)

    // return user ? (
    //             <Switch> {/* // Switch сгрупировывает маршруты Route и если ни 1 из роутов не выполнился то выполниться последний */}
    //                 {privateRoutes.map(({path, Component}) =>
    //                     <Route path={path} component={Component} exact={true}/> //exact что бы компанент орисоывался в точности по этому пути
    //                 )}
    //                 {/* если пользователь попыпатся перейти на несущесвтующую страницу его перееинет на сраницу с чатом */}
    //                 <Redirect to={CHAT_ROUTE}/>
    //             </Switch>
    //         ) : (
    //             <Switch>
    //                 {publicRoutes.map(({path, Component}) =>
    //                     <Route path={path} component={Component} exact={true}/> //exact что бы компанент орисоывался в точности по этому пути
    //                 )}
    //                 {/* если пользователь попыпатся перейти на несущесвтующую страницу его перееинет на сраницу с авторизацией */}
    //                 <Redirect to={LOGIN_ROUTE}/>
    //             </Switch>
    // );

    // return (
    //     <Routes>
    //         {/* {user && privateRoutes.map(({path, Component}) => 
    //             <Route key={path} path={path} element={<Component/>} exact/>
    //         )}
    //         {publicRoutes.map(({path, Component}) =>
    //             <Route key={path} path={path} element={<Component/>} exact/>
    //         )}
    //         {user ?  
    //             <Route path='*' element={<Navigate to={CHAT_ROUTE}/>}/>
    //             :
    //             <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
    //         } */}


    //         {/* {user ?
    //             privateRoutes.map(({path, Component}) => 
    //                 <Route key={path} path={path} element={<Component/>} exact/>
    //             )
    //             :
    //             publicRoutes.map(({path, Component}) =>
    //             <Route key={path} path={path} element={<Component/>} exact/>
    //             )
    //         } */}

    //         {/* {publicRoutes.map(({path, Component}) =>
    //             <Route key={path} path={path} element={<Component/>} exact/>
    //         )} */}
    //         {/* {user ?  
    //             <Route path='*' element={<Navigate to={CHAT_ROUTE}/>}/>
    //             :
    //             <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
    //         } */}
    //     </Routes>
    // )
    return user ?
    (
        <Routes>
            {
                privateRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component/>} exact/>
                )
            }
            <Route path='*' element={<Navigate to={CHAT_ROUTE}/>}/>
        </Routes>
    )
    :
    (
        <Routes>
            {
                publicRoutes.map(({path, Component}) => 
                    <Route key={path} path={path} element={<Component/>} exact/>
                )
            }
            <Route path='*' element={<Navigate to={LOGIN_ROUTE}/>}/>
        </Routes>
    )
};

export default AppRouter;