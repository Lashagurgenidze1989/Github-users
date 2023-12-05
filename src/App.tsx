import UserSearch from "./components/UserSearch";
import { useState } from "react";

function App() {
  const [switchMode, setSwitchMode] = useState(false);

  return (
    <div
      className={`${
        switchMode ? "bg-[#F6F8FF]" : "bg-[#141D2F]"
      } h-[100vh] flex r justify-center pt-8 md:pt-[140px]`}
    >
      <UserSearch switchMode={switchMode} setSwitchMode={setSwitchMode} />
    </div>
  );
}

export default App;
