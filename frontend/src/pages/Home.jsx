import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import MoodTracker from "../components/MoodTracker";
import ProgressCard from "../components/ProgressCard";
import ToolGrid from "../components/ToolGrid";
import QuoteCard from "../components/QuoteCard";

function Home({ username }) {

  return (

    <div className="page">

      <Header username={username} />

      <HeroBanner />

      <MoodTracker />

      <ProgressCard />

      <ToolGrid />

      <QuoteCard />

    </div>

  );
}

export default Home;