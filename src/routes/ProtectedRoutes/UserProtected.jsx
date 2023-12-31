import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from 'react-router-dom'

import AdminHomePage from "../../pages/Admin/AdminHomePage";
import { connectWebSocket, showNotification } from '../../helpers/Notificationuser';
import { useSelector } from "react-redux";
import LoginPage from "../../pages/User/LoginPage";
import { UserAxiosInstant } from "../../utils/axiosUtils";


// const RefreshToken = async () => {
//     // const navigate = useNavigate()
//     let authToken = localStorage.getItem("token");
//     const refreshtoken = JSON.parse(authToken);
//     try {
//         const res = await UserAxiosInstant.post(
//             "accounts/token/refresh/",
//             { refresh: refreshtoken.refresh },
//             { withCredentials: true }
//           );
//           if (res.status === 200) {
//             const token = JSON.stringify(res.data);
//             localStorage.setItem("token", token);
//           }
//     } catch (error) {
//         // navigate('/login/')
//         console.error(error);
//     }

//   };

function UserProtected() {
    const token = localStorage.getItem('token');
    const [notifications, setNotifications] = useState([]);
    const { userinfo } = useSelector((state) => state.user);


    // useEffect(() => {
    //     if (token) {
    //         const decoded = jwtDecode(token);

    //         if (decoded.role === 'user') {
    //             const cleanupWebSocket = connectWebSocket(userinfo.id, setNotifications, showNotification);

    //             return () => {
    //                 cleanupWebSocket();
    //             };
    //         }
    //     }
    //     // RefreshToken()
    // }, [token, userinfo.id]);

    if (token) {
        const decoded = jwtDecode(token);

        if (decoded.role === 'user') {
            return <Outlet />;
        } else if (decoded.role === 'admin') {
            return <AdminHomePage />;
        }
    } else {
        return <LoginPage />;
    }
}

export default UserProtected;
export {
    // RefreshToken
}