import { useState } from "react";
import Searchbar from "../components/Searchbar";
import Shows from "../components/Shows";
import { useTVMazeHook } from "../hook/useTvMazeHook";

function HomeScreen() {
  const { series, search } = useTVMazeHook();

  return (
    <>
      <Searchbar onSearch={search} />
      <Shows data={series} />
    </>
  );
}

export default HomeScreen;
