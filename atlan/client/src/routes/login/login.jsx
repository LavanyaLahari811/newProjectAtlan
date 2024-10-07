import "./login.scss";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../../components/form/form.component";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("https://backend-atlan.onrender.com/auth/login", {
        username,
        email,
        password,
      });
      if (response.data.message === "username or password is Incorrect") {
        alert(response.data.message); 
      } else {
        setCookies("access_token", response.data.token);
        window.localStorage.setItem("userId", response.data.userId);
        // console.log(response);
        navigate("/display");
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="login-auth">
      <Form
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        label="Login"
        onSubmit={onSubmit}
        id_u="login-username"
        id_p="login-password"
        id_e="login-email"
      />
    </div>
  );
};

export default Login;
