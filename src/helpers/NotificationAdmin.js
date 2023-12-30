import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { wsurl } from "../constants/constants";

const connectWebSocket = (setNotifications, showNotification) => {
    const client  = new W3CWebSocket(`${wsurl}ws/adminnotifications/`);

    client.onopen = (e) => {
      console.log("WebSocket connection opened:", e);
    };

    client.onclose = (e) => {
      console.log("WebSocket connection closed:", e);
      setTimeout(connectWebSocket, 15000);
    };

    client.onerror = (e) => {
      console.error("WebSocket connection error:", e);
    };

    client.onmessage = (message) => {
      
        const data = JSON.parse(message.data);
        console.log('Showwwwwww nottifcationnnnnnnnnnnn',data);
      setNotifications((prevNotifications) => [...prevNotifications, data]);
      
      showNotification(data.message);
    };

    return () => {
      console.log("Cleaning up WebSocket connection...");
      client.close();
    };
  };


  const showAdminNotification = (message) => {
    if (!("Notification" in window)) {
      console.log("This browser does not support desktop notification");
      return;
    }
  
    // Check if the user has granted permission for notifications
    if (Notification.permission === "granted") {
      // Create and show the notification
      const notification = new Notification("Admin Notification", {
        body: message,
      });
  
      // Close the notification after a few seconds (adjust as needed)
      setTimeout(notification.close.bind(notification), 50000);
    } else if (Notification.permission !== "denied") {
      // Request permission from the user
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Create and show the notification
          const notification = new Notification("Admin Notification", {
            body: message,
          });
  
          // Close the notification after a few seconds (adjust as needed)
          setTimeout(notification.close.bind(notification), 5000);
        }
      });
    }
  };


const sendNotificationadmin = (message) => {
    const socket = new W3CWebSocket(`${wsurl}ws/adminnotifications/`);
    socket.onopen = () => {

      const notification ={
        type:"notification",
        message:message
      }

      socket.send(JSON.stringify(notification));
      socket.close();
    };
  };

export { connectWebSocket, showAdminNotification,sendNotificationadmin };