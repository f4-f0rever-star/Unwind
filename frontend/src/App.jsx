import { useState } from "react";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Tasks from "./pages/Tasks";
import Mindfulness from "./pages/Mindfulness";
import Journal from "./pages/Journal";
import Profile from "./pages/Profile";

import BottomNav from "./components/BottomNav";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState("");

  const [page, setPage] = useState("home");

  if (!loggedIn) {

    return (
      <Login
        setLoggedIn={setLoggedIn}
        setUsername={setUsername}
      />
    );

  }

  return (

    <div className="app">

      {page === "home" &&
        <Home username={username} />
      }

      {page === "tasks" &&
        <Tasks />
      }

      {page === "mindfulness" &&
        <Mindfulness />
      }

      {page === "journal" &&
        <Journal />
      }

      {page === "profile" &&
        <Profile username={username} />
      }

      <BottomNav setPage={setPage} />

    </div>

  );
}

export default App;