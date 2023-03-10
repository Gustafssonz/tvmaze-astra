import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { useApp } from "../context/Appcontext";

function DetailScreen() {
  const { show, showDetails } = useApp();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useMemo(() => {
    setLoading(true);
    id && showDetails(id);
  }, [id]);

  const goBack = () => {
    window.history.back();
  };
  var showSummary = show?.summary?.replace(/<[^>]+>/g, "");

  const goBackButton = (
    <button className="rounded h-10 w-10" onClick={goBack}>
      <svg className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    </button>
  );

  const showCard = (
    <div className="flex flex-col p-6 md:p-12 mx-auto shadow-md rounded-md justify-center">
      {goBackButton}
      <h1 className="text-4xl font-bold text-center pb-2">{show?.name}</h1>
      <p className="text-center text-lg pb-2">
        {show?.premiered} - {show?.status}
      </p>
      <div className="mx-auto">
        <img
          className="rounded-lg object-center"
          src={show?.image?.original}
          alt={show?.name}
        />
      </div>
      <p className="p-2 font-sans text-lg">{showSummary}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {loading && show === null ? <p>Loading...</p> : null}
      {show && showCard}
    </div>
  );
}

export default DetailScreen;
