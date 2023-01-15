import { Link } from "react-router-dom";
import { useTVMazeHook } from "../hook/useTvMazeHook";
import { Series } from "../models/TvMazeShow";
import ShowItem from "./ShowItem";

interface Props {
  data: Series[];
}

function Shows({ data }: Props) {
  const { loadingStatus } = useTVMazeHook();

  const noResults = (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-2xl font-bold">No results found</h1>
    </div>
  );
  const loading = (
    <div className="flex justify-center items-center h-96">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );

  const dataTable = (
    <div>
      {data?.map(({ show }) => (
        <Link to={`/details/${show?.id}`} key={show?.id}>
          <ShowItem show={show} />
        </Link>
      ))}
    </div>
  );

  // generate a table with the data
  return (
    <div className="container mx-auto p-2">
      {loadingStatus && loading}
      {!loadingStatus && data?.length === 0 ? noResults : dataTable}
    </div>
  );
}

export default Shows;
