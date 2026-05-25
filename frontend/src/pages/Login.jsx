import { useState } from "react";
import { motion } from "framer-motion";

function Login({
  setLoggedIn,
  setUsername
}) {

  const [name, setName] = useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = () => {

    if (
      name.trim() &&
      password.trim()
    ) {

      setUsername(name);

      setLoggedIn(true);

    }

  };

  return (

    <div className="login-page">

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >

        <h1>UNWIND</h1>

        <p>
          Your mind. Your peace.
        </p>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="main-btn"
          onClick={handleLogin}
        >
          Begin Journey →
        </button>

      </motion.div>

    </div>

  );
}

export default Login;