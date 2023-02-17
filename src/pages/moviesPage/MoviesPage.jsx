import { useLocation, Link } from "react-router-dom";
import React from "react";
import { getFilmsForSearch } from "../../services/services-api";
import Loader from "../../components/loader/Loader";
import SearchForm from "../../components/searchForm/SearchForm";
import defaultPhoto from "../../images/no-img.jpg";
import toast from "react-hot-toast";
import css from "./MoviesPage.module.scss";

export default function MoviesPage() {
  const location = useLocation();
  const [findedFilms, setFindedFilms] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const value = location.search.slice(1);
  
  React.useEffect(() => {
    const pictureMethod = ({ results }) => {
    if (results.length === 0) {
      return toast.error("There is no result for your reqest!");
    } 
    // if (findedFilms === []) {
    //   return setFindedFilms(results);
    // }
    setFindedFilms((prevState) => [...prevState, ...results]);
  };
    if (value) {
      setLoading(true);
      getFilmsForSearch(value, page)
        .then(pictureMethod)
        .catch((error) => {
          console.log(error);
        })
        .finally(setLoading(false));
    }
  }, [value, page]);
  
  return (
    <div>
      {loading && <Loader />}
      <SearchForm newSearch={setFindedFilms} newPage={setPage} />
      <ul className={css.list}>
        {findedFilms &&
          findedFilms.length !== 0 &&
          findedFilms.map(({ id, original_title, poster_path }) => {
            return (
              <li className={css.filmItem} key={id}>
                <Link
                  to={`/movies/${id}`}
                  state={{ from: location }}
                  className={css.itemsLink}
                >
                  <img
                    className={css.filmImages}
                    src={
                      poster_path
                        ? `https://image.tmdb.org/t/p/w500${poster_path}`
                        : `${defaultPhoto}`
                    }
                    alt={original_title}
                  />
                  <h3 className={css.titleFilm}>{original_title}</h3>;
                </Link>
              </li>
            );
          })}
      </ul>
      {findedFilms.length !== 0 && (
        <div className={css.buttonDiv}>
          <button
            className={css.loadMore}
            type="button"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next page
          </button>
        </div>
      )}
    </div>
  );
}