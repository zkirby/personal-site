import Home from "../components/Home";
import Kilroy from "../components/Kilroy";
import Eyes from '../components/Eyes';

export default function Root() {
  return (
    <div >
      <Home />
      {/* TODO: allow for mobile eye tracking*/}
      <div className="hidden md:block"><Eyes /></div>
      <div className="hidden md:flex w-[400px] h-[190px] m-auto"><Kilroy /></div>
    </div>
  );
}
