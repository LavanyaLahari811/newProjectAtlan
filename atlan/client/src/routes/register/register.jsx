import "./register.scss";
import { useState } from "react";
import axios from "axios";
import { Link, useNavigate} from "react-router-dom";
import Form from "../../components/form/form.component";

const Auth = () => {
  return (
    <div className="auth">
      <Register />
    </div>
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate=useNavigate();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response=await axios.post("https://backend-atlan.onrender.com/auth/register", {
        username,
        email,
        password,
      });
      console.log(response);
      if (response.data.message === "user already exists") {
        alert("User already exists. Please try logging in.");
      } else {
        alert("Registration completed successfully. Now login.");
        setUsername("");
        setPassword("");
        setEmail("");
        navigate("/login");
      }

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="register-auth">
      <Form
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        label="Register"
        onSubmit={onSubmit}
        id_u="register-username"
        id_p="register-password"
        id_e="register-email"
      />
      <Link to={"/login"} style={{ color: "black", fontWeight: "400",textDecoration:"underline" }}>Already registered? Login</Link>
    </div>
  );
};

export default Auth;