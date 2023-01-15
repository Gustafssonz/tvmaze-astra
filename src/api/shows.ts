import axios from "axios";

// fetch shows from tvMaze by search query
export const fetchShows = async (query: string) => {
  const response = await axios.get(
    `http://api.tvmaze.com/search/shows?q=${query}`
  );
  console.log("shows", response.data);

  return response.data;
};

// fetch show details from tvMaze by show id
export const fetchShowDetails = async (id: number) => {
  const response = await axios.get(`http://api.tvmaze.com/shows/${id}`);
  console.log("details", response.data);

  return response.data;
};
