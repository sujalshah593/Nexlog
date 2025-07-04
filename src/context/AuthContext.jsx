import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

const initialUsers = [
  {
    id: "1",
    name: "Sujal Shah",
    email: "sujalshah593@gmail.com",
    bio: "UI/UX Designer and Frontend Developer. I specialize in creating beautiful, user-friendly interfaces and have a passion for modern web technologies.",
    profilePicture: "/placeholder.svg?height=100&width=100",
    followers: ["1", "3"],
    following: ["1", "3"],
    joinedDate: "February 2024",
  },
  {
    id: "2",
    name: "Meet Bhayani",
    email: "mike@example.com",
    bio: "DevOps Engineer and Cloud Architect. I help teams build and deploy scalable applications using modern cloud technologies and best practices.",
    profilePicture: "/placeholder.svg?height=100&width=100",
    followers: ["1", "2"],
    following: ["1", "2"],
    joinedDate: "March 2024",
  },
]

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");
    const savedUsers = localStorage.getItem("users");

    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }

    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email) => {
    const foundUser = users.find((u) => u.email === email);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("currentUser", JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = (userData) => {
    const existingUser = users.find((u) => u.email === userData.email);
    if (existingUser) return false;

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      bio: userData.bio || "",
      profilePicture: userData.profilePicture || "/placeholder.svg",
      followers: [],
      following: [],
      joinedDate: new Date().toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      }),
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setUser(newUser);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    // 🔁 Sync UserContext
    window.dispatchEvent(new Event("storage"));

    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
  };

  const updateProfile = (profileData) => {
    if (!user) return;

    const updatedUser = {
      ...user,
      ...profileData,
    };

    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    const updatedUsers = users.map((u) => (u.id === user.id ? updatedUser : u));
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));

    // 🔁 Sync UserContext
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
