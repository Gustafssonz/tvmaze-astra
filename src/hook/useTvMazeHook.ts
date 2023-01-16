import { useEffect, useState } from "react";
import Axios from "axios";
import { Series, Show } from "../models/TvMazeShow";

export const useTVMazeHook = () => {
  const [detail, setDetails] = useState<Show | null>(null);
  const [result, setResult] = useState<Series[]>([]);

  const [slowConnection, setSlowConenction] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const TIMEOUT = 2000;

  useEffect(() => {
    const data = window.localStorage.getItem("result");
    if (data) {
      setResult(JSON.parse(data));
    }
  }, []);

  const searchHandler = (text: string) => {
    Axios.get<Series[]>(`https://api.tvmaze.com/searh/shows?q=${text}`, {
      timeout: TIMEOUT,
    })
      .then((res) => {
        setResult(res.data);
        window.localStorage.setItem("result", JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          setSlowConenction(true);
        } else {
          console.log("ERROR", err);
          setError(true);
        }
      });
  };

  // fetch details of a show based on id
  const showDetailsHandler = (id: string) => {
    Axios.get<Show>(`https://api.tvmaze.com/shows/${id}`)
      .then((res) => {
        setDetails(res.data);
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          setSlowConenction(true);
        } else {
          setError(true);
        }
      });
  };

  return {
    slowStatus: slowConnection,
    errorStatus: error,
    series: result,
    show: detail,
    search: searchHandler,
    showDetails: showDetailsHandler,
  };
};
