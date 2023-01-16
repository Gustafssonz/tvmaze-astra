import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/Appcontext";
import { Show } from "../models/TvMazeShow";

interface Props {
  show: Show;
}
function ShowItem({ show }: Props) {
  const { favorites, addFavorite, removeFavorite } = useApp();

  useEffect(() => {}, [favorites]);

  const checkIfFavorite = (id: number) => {
    return favorites?.some((favorite) => favorite.id === id);
  };

  const handleFavorite = (show: Show) => {
    if (checkIfFavorite(show.id)) {
      removeFavorite(show);
    } else {
      addFavorite(show);
    }
  };

  return (
    <div className="mb-4 flex col-auto">
      <div className="self-center p-8">
        <input
          id="checkbox"
          type="checkbox"
          checked={checkIfFavorite(show.id)}
          onChange={() => handleFavorite(show)}
          className="w-6 h-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>
      <Link className="flex-auto " to={`/details/${show?.id}`} key={show?.id}>
        <article className="flex flex-auto space-x-6 p-6 hover:bg-gray-200 rounded-lg">
          <img
            src={show?.image?.medium}
            alt=""
            width="60"
            height="88"
            className="flex-none rounded-md bg-slate-100"
          />
          <div className="min-w-0 relative flex-auto">
            <h2 className="font-semibold text-slate-900 truncate pr-20">
              {show?.name}
            </h2>
            <dl className="mt-2 flex flex-wrap text-sm leading-6 font-medium">
              {show?.rating.average > 0 && (
                <div className="absolute top-0 right-0 flex items-center space-x-1">
                  <dt className="text-sky-500">
                    <svg width="16" height="20" fill="currentColor">
                      <path d="M7.05 3.691c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.372 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.539 1.118l-2.8-2.034a1 1 0 00-1.176 0l-2.8 2.034c-.783.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.363-1.118L.98 9.483c-.784-.57-.381-1.81.587-1.81H5.03a1 1 0 00.95-.69L7.05 3.69z" />
                    </svg>
                  </dt>
                  <dd>{show?.rating.average}</dd>
                </div>
              )}
              <div className="ml-2">
                <dd>{show?.premiered}</dd>
              </div>
              <div>
                <dd className="flex items-center">
                  <svg
                    width="2"
                    height="2"
                    fill="currentColor"
                    className="mx-2 text-slate-300"
                    aria-hidden="true"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  {show?.genres && show?.genres.join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </Link>
    </div>
  );
}

export default ShowItem;
