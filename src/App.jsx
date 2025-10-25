import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import { useState } from "react";

import OpenLayersMap from "./components/OpenLayersMap";

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);

  return (
    <>
      <Navbar />
      <Header onLocationSelect={setSelectedLocation} />
      <OpenLayersMap location={selectedLocation} />
    </>
  );
}
export default App;
