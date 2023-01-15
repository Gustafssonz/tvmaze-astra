import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import { QueryClient, QueryClientProvider } from "react-query";

import Navbar from "./components/Navbar";
import HomeScreen from "./pages/HomeScreen";
import DetailScreen from "./pages/DetailScreen";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto m-5">
          <Navbar></Navbar>
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
