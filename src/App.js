import { useEffect, useState } from "react";
import "./App.css";
import { Movie } from "./components/Movie";

const FEARURED_API =
  "https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2014-09-15&primary_release_date.lte=2022-10-22&api_key=071f6ddb38ad68755e2fb9b69dae5058";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(FEARURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  const handelChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <header>
        <input
          type="search"
          onChange={handelChange}
          className="search"
          value={search}
          placeholder="Search..."
        />
      </header>
      <div className="movie_container">
        {movies.length > 0 &&
          movies
            .filter((value) => {
              if (search === "") {
                return value;
              } else if (
                value.title.toLowerCase().includes(search.toLowerCase())
              ) {
                return value;
              }
            })
            .map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

export default App;
