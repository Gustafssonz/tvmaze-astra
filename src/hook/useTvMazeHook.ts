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

  // fetch details of a show based on id
  const showDetailsHandler = (id: string) => {
    console.log("show id: " + id);
    Axios.get<Show>(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        console.log("Show details, ", res.data);
        setDetails(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    series: result,
    show: detail,
    search: searchHandler,
    showDetails: showDetailsHandler,
  };
};
