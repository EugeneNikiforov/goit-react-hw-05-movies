import { getFilmsReviwers } from "../../services/services-api";
import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import styled from "./Reviews.module.scss";

export default function Reviews() {
  const [review, setReview] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { movieId } = useParams();

  React.useEffect(() => {
    setLoading(true);
    getFilmsReviwers(movieId)
      .then(setReview)
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }, [movieId]);
  return (
    <>
      {loading && <Loader />}
      <ul className={styled.list}>
        {review && review.results.length !== 0 ? (
          review.results.map(({ id, author, content }) => {
            return (
              <li className={styled.review} key={id}>
                <h2 className={styled.author}>{author}</h2>
                <p className={styled.text}>{content}</p>
              </li>
            );
          })
        ) : (
          <h2>We don't have any reviews for this movie.</h2>
        )}
      </ul>
    </>
  );
}