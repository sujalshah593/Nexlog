import { createContext, useContext, useState, useEffect } from "react";
import Meet from "../assets/meet.jpg";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const imageMap = {
    "3": Meet,
  };

  const patchImages = (userList) => {
    return userList.map((user) => ({
      ...user,
      profilePicture: imageMap[user.id] || user.profilePicture || "/placeholder.svg",
    }));
  };

  useEffect(() => {
    const loadUsers = () => {
      const savedUsers = localStorage.getItem("users");
      if (savedUsers) {
        const parsed = JSON.parse(savedUsers);
        setUsers(patchImages(parsed));
      }
    };

    loadUsers();

    const handleStorageChange = () => {
      loadUsers();
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const followUser = (userId, followerId) => {
    const updated = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          followers: [...new Set([...user.followers, followerId])],
        };
      }
      if (user.id === followerId) {
        return {
          ...user,
          following: [...new Set([...user.following, userId])],
        };
      }
      return user;
    });

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  const unfollowUser = (userId, followerId) => {
    const updated = users.map((user) => {
      if (user.id === userId) {
        return {
          ...user,
          followers: user.followers.filter((id) => id !== followerId),
        };
      }
      if (user.id === followerId) {
        return {
          ...user,
          following: user.following.filter((id) => id !== userId),
        };
      }
      return user;
    });

    setUsers(updated);
    localStorage.setItem("users", JSON.stringify(updated));
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <UserContext.Provider value={{ users, followUser, unfollowUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
