import { useApp } from "../context/Appcontext";

function Favorites() {
  const { favorites, removeAllFavorites, removeFavorite } = useApp();

  return (
    <div>
      {favorites.length !== 0 && (
        <div>
          <div className="flex">
            <h2 className="text-2xl font-bold p-4">Favorites</h2>
            <button
              className="px-3 my-auto py-2 text-xs font-medium text-center text-white bg-gray-600 rounded-lg hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              type="button"
              onClick={removeAllFavorites}
            >
              Clear all
            </button>
          </div>
          <div className="flex flex-wrap justify-center items-center">
            {favorites.map((show, key) => (
              <button
                key={key}
                type="button"
                onClick={() => removeFavorite(show)}
                className="flex py-2.5 pr-3 px-5 mr-2 mb-2 text-m font-medium text-gray-900 focus:outline-none bg-white rounded-full border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-gray-200"
              >
                {show?.name}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className=" ml-2 h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorites;
