import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./pages/DetailScreen";
import Alert from "./components/Alert";
import { useTVMazeHook } from "./hook/useTvMazeHook";
import { useEffect } from "react";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
