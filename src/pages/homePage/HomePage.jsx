import React from "react";
import RecomendedFilms from "../../components/recomendedFilms/RecomendedFilms";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import { getRecomendation } from "../../services/services-api";
import styles from "./HomePage.module.scss";

export default function HomePage() {
  const [films, setFilms] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const pictureMethod = ({ results }) => {
    if (results.length === 0) {
      return toast.error("Images are over!");
    }
    if (films.length === 0) {
      return setFilms(results);
    }
    setFilms((prevState) => [...prevState, ...results]);
  };
    setLoading(true);
    getRecomendation(page)
      .then(pictureMethod)
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [page]);

  return (
    <main>
      <h1 className={styles.pageTitle}>Popular of this week</h1>
      {loading && <Loader />}
      <ul className={styles.listFilms}>
        {films.length !== 0 && <RecomendedFilms cards={films} />}
      </ul>
      {films.length !== 0 && (
        <div className={styles.buttonDiv}>
          <button
            className={styles.loadMore}
            type="button"
            onClick={() => {
              setPage((prev) => prev + 1);
            }}
          >
            Next page
          </button>
        </div>
      )}
    </main>
  );
}