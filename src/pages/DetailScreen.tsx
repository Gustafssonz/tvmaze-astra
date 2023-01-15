import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useTVMazeHook } from "../hook/useTvMazeHook";

function DetailScreen() {
  const { show, showDetails } = useTVMazeHook();

  const { id } = useParams();
  console.log("params", id);
  // pass the id to the hook showDetails

  id && showDetails(id);

  console.log("show", show);

  return (
    // generate a presentation of show details
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold">{show?.name}</h1>
      <img src={show?.image?.medium} alt={show?.name} />
      <p>{show?.summary}</p>
    </div>
  );
}

export default DetailScreen;
