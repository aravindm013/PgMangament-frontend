import React, { useEffect } from "react";
import axios from "axios";
import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import AddBuidling from "./components/AddBuilding";
import Login from "./components/Login";
import AddRoom from "./components/AddRoom";
import AddTenant from "./components/AddTenant";


export const paths = {
    addBuilding: "/addBuilding",
    addRoom: "/addroom",
    addTenant: "/addtenant",
    login: "/login"
}

export const routes = [
    {
        path: paths.login,
        component: Login
    },
    {
        path: `${paths.addBuilding}/:user_Id`,
        component: AddBuidling
    },
    {
        path: `${paths.addRoom}/:build_Id`,
        component: AddRoom
    },
    {
        path :`${paths.addTenant}/:room_Id/:build_Id`,
        component: AddTenant
    }
]

const App = (props) => {

    useEffect(()=>{
        const userDetails = localStorage.getItem('userDetails')
        // console.log(userDetails)
        const token = userDetails ? JSON.parse(userDetails).token : null
        // console.log(token)
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
    }, [])

    return(
        <div className="container">
            <Header />
            <Routes>
                {
                    routes.map((route, i) => {
                        return <Route key={i} path={route.path} element={<route.component/>} />
                    })
                }
                <Route path="*" element={<Navigate to={"/login"} />} />
            </Routes>
        </div>
    )
}

export default App