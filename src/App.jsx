import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import SearchBar from "./components/Search";
import OpenLayersMap from "./components/OpenLayersMap";

function App() {
  return (
    <>
      <Navbar />
      <Header />
      <OpenLayersMap />
    </>
  );
}

export default App;
