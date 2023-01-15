import React, { useState } from "react";
import Axios from "axios";
import { Series, Show } from "../models/TvMazeShow";
import { Route } from "react-router-dom";

export const useTVMazeHook = () => {
  const [detail, setDetails] = useState<Show | null>(null);
  const [result, setResult] = useState<Series[]>([]);
  // use router

  const searchHandler = (text: string) => {
    console.log("searching for: " + text);

    Axios.get<Series[]>(`https://api.tvmaze.com/search/shows?q=${text}`)
      .then((res) => {
        console.log(res.data);
        setResult(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //   const onShowClickHandler = (show: Show) => {
  //     // send user to detail page based on show id
  //     setDetails(show);
  //     history.push(`/details/${show.id}`);

  //     setDetails(series.show);
  //   };

  //   const closeModal = () => {
  //     setDetails(null);
  //   };

  return {
    series: result,
    details: detail,
    search: searchHandler,
    // onClick: onShowClickHandler,
  };
};
