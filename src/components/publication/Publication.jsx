import PropTypes from "prop-types";
import styled from "./Publication.module.scss";

export default function Publication({ item }) {
  const {
    poster_path,
    original_title,
    overview,
    genres,
    vote_count,
    vote_average,
  } = item;
  const userScore = Math.round((vote_count * vote_average) / 100);
  return (
    <div className={styled.arrangement}>
      <div className={styled.left_section}>
        <h2 className={styled.main_title}>{original_title}</h2>
        <img
          className={styled.mainPhoto}
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={original_title}
        />
      </div>
      <div className={styled.right_section}>
        <h3 className={styled.title}>Overview:</h3>
        <p className={styled.text}>{overview}</p>
        <p className={styled.text}>User score: {userScore}%</p>
        <h3 className={styled.title}>Genres:</h3>
        <ul className={styled.list}>
          {genres.map(({ id, name }) => {
            return (
              <li className={styled.text} key={id}>
                {name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

Publication.propTypes = {
  item: PropTypes.object.isRequired,
};