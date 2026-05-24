function Profile({ username }) {

  return (

    <div className="page">

      <div className="profile-card">

        <div className="big-avatar">
          😊
        </div>

        <h2>
          {username}
        </h2>

        <p>
          Keep growing beautifully 🌿
        </p>

      </div>

    </div>

  );
}

export default Profile;