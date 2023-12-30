import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import { jwtDecode } from 'jwt-decode'
import { connectWebSocket, showAdminNotification } from '../../helpers/NotificationAdmin'
import AdminLogin from '../../pages/Admin/AdminLogin'


function AdminProtected() {
    const [notifications, setNotifications] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (token) {
            const decode = jwtDecode(token);

            if (decode.role === 'admin') {
                const cleanupWebSocket = connectWebSocket(setNotifications, showAdminNotification);

                return () => {
                    cleanupWebSocket();
                };
            }
        }
        // RefreshToken()
    }, [token]);

    if (token) {
        const decode = jwtDecode(token);

        if (decode.role === 'user') {
            return <HomePage />;
        } else if (decode.role === 'admin' && decode.is_superuser) {
            return <Outlet />;
        }
    } else {
        return <AdminLogin />;
    }
}

export default AdminProtected;
