import { getFilmsCredits } from "../../services/services-api";
import React from "react";
import { useParams } from "react-router-dom";
import defaultPhoto from "../../images/no-img.jpg";
import Loader from "../../components/loader/Loader";
import css from "./Cast.module.scss";

export default function Cast() {
  const [cast, setCast] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { movieId } = useParams();

  React.useEffect(() => {
    setLoading(true);
    getFilmsCredits(movieId)
      .then(setCast)
      .catch((error) => console.log(error))
      .finally(setLoading(false));
  }, [movieId]);
  return (
    <div>
      <ul className={css.list}>
        {loading && <Loader />}
        {cast &&
          cast.cast.map(({ id, name, profile_path, character }) => {
            return (
              <li className={css.cast_item} key={id}>
                {
                  <img
                    className={css.cast_photo}
                    src={
                      profile_path
                        ? `https://image.tmdb.org/t/p/w500${profile_path}`
                        : `${defaultPhoto}`
                    }
                    alt={name}
                  />
                }
                <p className={css.text}>{character}</p>
                <h2 className={css.text}>{name}</h2>
              </li>
            );
          })}
      </ul>
    </div>
  );
}