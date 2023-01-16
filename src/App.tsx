import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./pages/DetailScreen";
import Navbar from "./components/Navbar";
import { ProvideApp } from "./context/Appcontext";

function App() {
  return (
    <BrowserRouter>
      <ProvideApp>
        <div className="container mx-auto m-5">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/details/:id" element={<DetailScreen />} />
          </Routes>
          <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </div>
      </ProvideApp>
    </BrowserRouter>
  );
}

export default App;
