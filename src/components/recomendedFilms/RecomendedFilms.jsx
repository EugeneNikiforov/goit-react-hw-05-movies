import { Link } from "react-router-dom";
import defaultPhoto from "../../images/no-img.jpg";
import PropTypes from "prop-types";
import css from "./RecomendedFilms.module.scss";

export default function RecomendedFilms({ cards }) {
  return (
    <>
      {cards.map(({ id, original_title, poster_path }) => {
        return (
          <li className={css.filmItem} key={id}>
            <Link to={`/movies/${id}`} className={css.itemsLink}>
              <img
                className={css.filmImages}
                src={
                  poster_path
                    ? `https://image.tmdb.org/t/p/w500${poster_path}`
                    : `${defaultPhoto}`
                }
                alt={original_title}
              />
              <h3 className={css.titleFilm}>{original_title}</h3>
            </Link>
          </li>
        );
      })}
    </>
  );
}

RecomendedFilms.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      original_title: PropTypes.string.isRequired,
      poster_path: PropTypes.string.isRequired,
    })
  ),
};