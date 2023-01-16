import Axios from "axios";
import { useState, useContext, createContext } from "react";
import { Series, Show } from "../models/TvMazeShow";

interface IAppContext {
  slowStatus: boolean;
  errorStatus: boolean;
  series: Series[];
  show: Show | null;
  search: (text: string) => void;
  showDetails: (id: string) => void;
}

const AppContext = createContext<IAppContext>({
  slowStatus: false,
  errorStatus: false,
  series: [],
  show: null,
  search: () => {},
  showDetails: () => {},
});

export const ProvideApp = ({ children }: any) => {
  const app = useProvideApp();
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  return useContext(AppContext);
};

const useProvideApp = () => {
  const [slowStatus, setSlowStatus] = useState(false);
  const [errorStatus, setErrorStatus] = useState(false);
  const [series, setSeries] = useState<Series[]>([]);
  const [show, setShow] = useState<Show | null>(null);

  const search = (text: string) => {
    const savedData = window.localStorage.getItem(`text_${text}`);
    if (savedData) {
      console.log("DATA FROM LOCAL STORAGE");
      setShow(JSON.parse(savedData));
      return;
    } else {
      Axios.get(`https://api.tvmaze.com/search/shows?q=${text}`, {
        timeout: 500,
      })
        .then((res) => {
          setSeries(res.data);
          window.localStorage.setItem(`text_${text}`, JSON.stringify(res.data));
        })
        .catch((err) => {
          if (err.code === "ECONNABORTED") {
            setSlowStatus(true);
          } else {
            console.log("ERROR search: ", err);
            setErrorStatus(true);
          }
        });
    }
  };

  const showDetails = (id: string) => {
    const savedData = window.localStorage.getItem(`show_${id}`);

    if (savedData) {
      console.log("DATA FROM LOCAL STORAGE");
      setShow(JSON.parse(savedData));
      return;
    } else {
      Axios.get(`https://api.tvmaze.com/shows/${id}`)
        .then((res) => {
          setShow(res.data);
          window.localStorage.setItem(`show_${id}`, JSON.stringify(res.data));
        })
        .catch((err) => {
          console.log("Error showDetails: ", err);
          setErrorStatus(true);
        });
    }
  };

  return {
    slowStatus,
    errorStatus,
    series,
    show,
    search,
    showDetails,
  };
};
