import Home from "../views/Home";
import Kilroy from "../views/Kilroy";
import Eyes from '../views/webgl/Eyes';

export default function Root() {
  return (
    <div className="">
      <Home />
      <Eyes />
      <div className="w-[400px] h-[190px] flex m-auto"><Kilroy /></div>
    </div>
  );
}
