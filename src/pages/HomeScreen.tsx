import Favorites from "../components/Favorites";
import Searchbar from "../components/Searchbar";
import Shows from "../components/Shows";

function HomeScreen() {
  return (
    <>
      <Searchbar />
      <Favorites />
      <Shows />
    </>
  );
}

export default HomeScreen;
