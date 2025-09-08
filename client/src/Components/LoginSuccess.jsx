// src/Pages/LoginSuccess.jsx
import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:3000/login/success", {
          withCredentials: true,
        });

        if (res.data && res.data.user) {
          localStorage.setItem("userData", JSON.stringify(res.data.user));
          toast.success("Login Successful!");
          navigate("/"); // or redirect based on role
        } else {
          toast.error("Login failed. Please try again.");
          navigate("/LoginPage");
        }
      } catch (err) {
        console.error("Login fetch failed", err);
        toast.error("Unauthorized. Try logging in again.");
        navigate("/LoginPage");
      }
    };

    fetchUser();
  }, []);

  return <div>Logging in...</div>;
};

export default LoginSuccess;
