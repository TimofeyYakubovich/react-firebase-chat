// будет всего 2 страницы но сделам роутинг так как будто большое приложение каторое будет маштабироваться

import Chat from "./components/Chat";
import Login from "./components/Login";
import { CHAT_ROUTE, LOGIN_ROUTE } from "./utils/consts";

// из этого файла будем экспортировать 2 переменные массива
export const publicRoutes = [ // маршруты для неавторизованных пользователей
    {
        path: LOGIN_ROUTE,
        Component: Login // компанент каторый будет отрисовываться по этому пути
    }
]

export const privateRoutes = [ // маршруты для только авторизованных пользователей
    {
        path: CHAT_ROUTE,
        Component: Chat // компанент каторый будет отрисовываться по этому пути
    }
]