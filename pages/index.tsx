import AboutMe from "../components/AboutMe";
import Kilroy from "../components/Kilroy";
import Eyes from '../components/Eyes';

export default function Root() {
  return (
    <div >
      <AboutMe />
      {/* TODO: allow for mobile eye tracking*/}
      <div className="md:hidden flex justify-center w-full mt-5 font-bold italic text-red-600">(try a browser or a bigger window size to see the whole site!)</div>
      <div className="hidden md:block"><Eyes /></div>
    </div>
  );
}
