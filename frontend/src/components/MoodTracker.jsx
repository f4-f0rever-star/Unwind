function MoodTracker() {

  const moods = [
    "😄",
    "🙂",
    "😐",
    "😔",
    "😩"
  ];

  return (

    <div className="glass-card">

      <h3>
        How are you feeling?
      </h3>

      <div className="mood-row">

        {moods.map((mood, i) => (

          <button
            key={i}
            className="mood-circle"
          >
            {mood}
          </button>

        ))}

      </div>

    </div>

  );
}

export default MoodTracker;