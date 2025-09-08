// src/Context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import * as jwt_decode from "jwt-decode";
const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  const defaultProfileImage = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';

  const login = (userData, jwtToken) => {
    const completeUserData = {
      ...userData,
      displayName: userData.displayName || userData.username,
      image: userData.image || defaultProfileImage
    };

    setCurrentUser(completeUserData);
    if (jwtToken) {
      setToken(jwtToken);
      localStorage.setItem("token", jwtToken);
    }
    localStorage.setItem("user", JSON.stringify(completeUserData));
  };

  const logout = async () => {
    try {
      // For Google logout
      await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.log("Regular logout");
    }

    setCurrentUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for Google session
        const response = await axios.get("http://localhost:3000/login/success", {
          withCredentials: true,
        });

        if (response.data.user) {
          const userData = {
            ...response.data.user,
            displayName: response.data.user.displayName || response.data.user.username,
            image: response.data.user.image || defaultProfileImage
          };
          login(userData, null);
        }
      } catch (error) {
        console.log("No active Google session");
      }

      // Check for JWT token from manual login
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
jwt_decode.jwt_decode(token)          
const userData = {
            _id: decoded.id,
            displayName: decoded.username,
            email: decoded.email,
            role: decoded.role,
            image: defaultProfileImage
          };
          setCurrentUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        } catch (decodeError) {
          console.error("Invalid token:", decodeError);
          logout();
        }
      }

      setLoading(false);
    };

    checkAuthStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ 
      currentUser, 
      token, 
      login, 
      logout,
      loading 
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};