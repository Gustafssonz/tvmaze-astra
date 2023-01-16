import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./pages/DetailScreen";
import Alert from "./components/Alert";
import { useTVMazeHook } from "./hook/useTvMazeHook";
import { useEffect } from "react";

function App() {
  const { slowStatus, errorStatus } = useTVMazeHook();

  useEffect(() => {
    if (slowStatus) {
      console.log("Slow network connection");
    }
    if (errorStatus) {
      console.log("An error occurred while fetching data");
    }
  }, [slowStatus, errorStatus]);

  return (
    <BrowserRouter>
      <div className="container mx-auto m-5">
        {slowStatus && <Alert message="Slow network connection" />}
        {errorStatus && (
          <Alert message="An error occurred while fetching data" />
        )}
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/details/:id" element={<DetailScreen />} />
        </Routes>
        <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </div>
    </BrowserRouter>
  );
}

export default App;
