import { Link } from "react-router-dom";
import { Series } from "../models/TvMazeShow";

export interface Props {
  data: Series[];
}

function Shows({ data }: Props) {
  console.log("from show", data);

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
    <table className="w-full text-sm text-left text-gray-500">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th className="border border-gray-200 px-4 py-2">Name</th>
          <th className="border border-gray-200 px-4 py-2">Image</th>
          <th className="border border-gray-200 px-4 py-2">Link to details</th>
        </tr>
      </thead>

      <tbody>
        {data.map(({ show }) => (
          <tr key={show.id} className="w-full">
            <td className="border border-gray-200 px-4 py-2">{show.name}</td>
            <td className="border border-gray-200 px-4 py-2">
              <img src={show.image?.medium} alt={show.name} />
            </td>
            <td className="border border-gray-200 px-4 py-2">
              {" "}
              <Link to={`/details/${show.id}`}>Link</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  // generate a table with the data
  return (
    <div className="container mx-auto px-4">
      {data.length === 0 ? noResults : dataTable}
    </div>
  );
}

export default Shows;
