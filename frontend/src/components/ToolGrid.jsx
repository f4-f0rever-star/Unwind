function ToolGrid() {

  const tools = [
    "🧘 Meditate",
    "🌙 Sleep",
    "🎵 Relax",
    "📖 Journal",
    "💧 Hydrate",
    "🌿 Breathe"
  ];

  return (

    <div className="tools-grid">

      {tools.map((tool, i) => (

        <div
          className="tool-card"
          key={i}
        >
          {tool}
        </div>

      ))}

    </div>

  );
}

export default ToolGrid;