import { useEffect, useState, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Gallery from "./components/Gallery";
import SearchBar from "./components/SearchBar";
import { DataContext } from "./context/DataContext";
import AlbumView from "./components/AlbumView";
import ArtistView from "./components/ArtistView";

function App() {
  let [search, setSearch] = useState("");
  let [message, setMessage] = useState("Search for Music!");
  let [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      document.title = `${search} Music`;
      const response = await fetch(
        "https://itunes.apple.com/search?term=the+grateful+dead"
      );
      const resData = await response.json();
      if (resData.results.length > 0) {
        setData(resData.results);
      } else {
        setMessage("Not Found");
      }
    };
    fetchData();
  }, [search]);

  const handleSearch = (e, term) => {
    e.preventDefault();
    setSearch();
  };
  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <SearchBar handleSearch={handleSearch} />
                <Gallery data={data} />
              </Fragment>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
