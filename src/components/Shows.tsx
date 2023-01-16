import { Link } from "react-router-dom";
import { useApp } from "../context/Appcontext";
import ShowItem from "./ShowItem";

function Shows() {
  const { series } = useApp();

  const noResults = (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-2xl font-bold">No results found</h1>
    </div>
  );

  const dataTable = (
    <div>
      {series?.map(({ show }) => (
        <Link to={`/details/${show?.id}`} key={show?.id}>
          <ShowItem show={show} />
        </Link>
      ))}
    </div>
  );

  // generate a table with the data
  return (
    <div className="container mx-auto p-2">
      {series?.length === 0 ? noResults : dataTable}
    </div>
  );
}

export default Shows;
