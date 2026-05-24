import {
  FaHome,
  FaTasks,
  FaBook,
  FaUser
} from "react-icons/fa";

function BottomNav({ setPage }) {

  return (

    <div className="bottom-nav">

      <button onClick={() => setPage("home")}>
        <FaHome />
      </button>

      <button onClick={() => setPage("tasks")}>
        <FaTasks />
      </button>

      <button
        className="middle-btn"
        onClick={() => setPage("mindfulness")}
      >
        ✨
      </button>

      <button onClick={() => setPage("journal")}>
        <FaBook />
      </button>

      <button onClick={() => setPage("profile")}>
        <FaUser />
      </button>

    </div>

  );
}

export default BottomNav;