import { useState } from "react";
import Searchbar from "../components/Searchbar";

function HomeScreen() {
  const [searchTerm, setSearchTerm] = useState("spiderman");

  return (
    <>
      <Searchbar onSearch={setSearchTerm} />
    </>
  );
}

export default HomeScreen;
