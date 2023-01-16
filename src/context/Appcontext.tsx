import Axios from "axios";
import { useState, useContext, createContext } from "react";
import { Series, Show } from "../models/TvMazeShow";

interface IAppContext {
  slowStatus: boolean;
  errorStatus: boolean;
  series: Series[] | null;
  show: Show | null;
  favorites: Show[];
  search: (text: string) => void;
  showDetails: (id: string) => void;
  addFavorite: (show: Show) => void;
  removeFavorite: (show: Show) => void;
  removeAllFavorites: () => void;
}

const AppContext = createContext<IAppContext>({
  slowStatus: false,
  errorStatus: false,
  series: [],
  show: null,
  favorites: [],
  search: () => {},
  showDetails: () => {},
  addFavorite: () => {},
  removeFavorite: () => {},
  removeAllFavorites: () => {},
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
  const [series, setSeries] = useState<Series[] | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [favorites, setFavorites] = useState<Show[]>(() => {
    const savedFavorites = window.localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  const search = (text: string) => {
    const savedData = window.localStorage.getItem(`text_${text}`);
    if (savedData) {
      setSeries(JSON.parse(savedData));
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
            console.error("search: ", err);
            setErrorStatus(true);
          }
        });
    }
  };

  const showDetails = (id: string) => {
    const savedData = window.localStorage.getItem(`show_${id}`);

    if (savedData) {
      setShow(JSON.parse(savedData));
      return;
    } else {
      Axios.get(`https://api.tvmaze.com/shows/${id}`)
        .then((res) => {
          setShow(res.data);
          window.localStorage.setItem(`show_${id}`, JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error("showDetails: ", err);
          setErrorStatus(true);
        });
    }
  };

  const addFavorite = (show: Show) => {
    const newFavorites = [...favorites, show];
    setFavorites(newFavorites);
    window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeFavorite = (show: Show) => {
    const newFavorites = favorites.filter((f) => f.id !== show.id);
    setFavorites(newFavorites);
    window.localStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  const removeAllFavorites = () => {
    setFavorites([]);
    window.localStorage.removeItem("favorites");
  };

  return {
    slowStatus,
    errorStatus,
    series,
    show,
    favorites,
    search,
    addFavorite,
    removeFavorite,
    removeAllFavorites,
    showDetails,
  };
};
