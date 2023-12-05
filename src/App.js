import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useEffect, useState } from "react";
import { getPopularMovies, searchMovies } from "./Redux/MovieAction";
import _debounce from "lodash/debounce";

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const isLoading = useSelector((state) => state.isLoading);
  const { popularMovies } = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  const debouncedSearch = _debounce((query) => {
    search(query);
  }, 500);

  const search = async (query) => {
    if (query.length > 3) {
      try {
        await dispatch(searchMovies({ query, page: currentPage }));
      } catch (error) {
        console.error("Error searching movies:", error);
      }
    }
  };

  useEffect(() => {
    const handleGetMovieList = async () => {
      try {
        await dispatch(getPopularMovies({ page: currentPage }));
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    handleGetMovieList();
  }, [currentPage]);

  const PopularMoviesList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="Movie-wrapper" key={i}>
          <div className="Movie-title">{movie.title}</div>
          <img
            className="Movie-image"
            src={`${process.env.REACT_APP_BASEIMGURL}${movie.poster_path}`}
            alt=""
          />
          <div className="Movie-date">release: {movie.release_date}</div>
          <div className="Movie-rate">{movie.vote_average}</div>
        </div>
      );
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <a href="/">MOVIEAPP 77</a>
        </h1>
        <input
          placeholder="search movie..."
          className="Movie-search"
          onChange={({ target }) => {
            setSearchQuery(target.value);
            debouncedSearch(target.value);
          }}
        />
        <div className="Movie-container">
          <PopularMoviesList />
        </div>
        <div className="Pagination">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          >
            Previous
          </button>
          <span>{currentPage}</span>
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            Next
          </button>
        </div>
      </header>
    </div>
  );
};

export default App;
