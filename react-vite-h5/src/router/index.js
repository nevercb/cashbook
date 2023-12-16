import Home from "@/container/Home";
import Data from "@/container/Data";
import User from "@/container/User";
import Detail from "@/container/Detail"; //测试
const routes = [
    {
        path: "/",
        component: Home
    },
    {
        path: "/data",
        component: Data
    },
    {
        path: "/user",
        component: User
    },
    {
        path: "/detail",
        component: Detail
    }
];

export default routes