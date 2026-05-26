export default function HomePage({ user, setPage }) {
  const cards = [
    {
      title: 'Plan your care',
      text: 'Add small daily actions you can actually finish.',
      page: 'tasks',
    },
    {
      title: 'Check your mood',
      text: 'Log how you feel and leave a note for yourself.',
      page: 'moods',
    },
    {
      title: 'Breathe now',
      text: 'Use a short breathing rhythm when your mind feels busy.',
      page: 'mindfulness',
    },
  ];

  return (
    <div className="page-stack">
      <section className="home-hero">
        <div>
          <span className="eyebrow">Today’s check-in</span>
          <h2>Welcome back, {user.username}.</h2>
          <p>
            Choose one gentle action. You do not need to fix everything today. Just begin somewhere kind.
          </p>
        </div>

        <button className="primary-btn hero-btn" onClick={() => setPage('mindfulness')}>
          Start Breathing
        </button>
      </section>

      <section>
        <div className="section-heading">
          <h3>Where do you want to begin?</h3>
          <p>Pick a path that matches what you need right now.</p>
        </div>

        <div className="feature-grid">
          {cards.map((card) => (
            <button key={card.title} className="feature-card" onClick={() => setPage(card.page)}>
              <span>{card.title}</span>
              <p>{card.text}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="quote-panel">
        <p>
          Small routines become emotional anchors. Breathing, writing, stretching, and pausing are tiny ways of telling your body: I am here.
        </p>
      </section>
    </div>
  );
}