import React from "react";
import "../styles/NotificationBell.css";
import { useNotifications } from "../context/NotificationContext";

const NotificationBell = () => {
  const { notifications, unreadCount, markAllAsRead } = useNotifications();

  return (
    <div className="notification-bell">
      <button onClick={markAllAsRead}>
        🔔 {unreadCount > 0 && <span className="badge">{unreadCount}</span>}
      </button>
      <div className="notification-dropdown">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className={`notification-item ${
              !notification.read ? "unread" : ""
            }`}
          >
            <img
              src={notification.sender.picture}
              alt={notification.sender.username}
            />
            <div className="notification-content">
              <p>
                {notification.sender.username}{" "}
                {getNotificationText(notification)}
              </p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const getNotificationText = (notification) => {
  switch (notification.type) {
    case "like":
      return "liked your post";
    case "comment":
      return "commented on your post";
    case "follow":
      return "started following you";
    case "message":
      return "sent you a message";
    default:
      return "interacted with you";
  }
};

export default NotificationBell;
