function Header({ username }) {

  return (

    <div className="header">

      <div>

        <p className="small-text">
          Good morning
        </p>

        <h1>
          {username} 👋
        </h1>

      </div>

      <div className="avatar">
        😊
      </div>

    </div>

  );
}

export default Header;