import { getFilmsReviwers } from "../../services/services-api";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import styled from "./Reviews.module.scss";

export default function Reviews() {
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();
  useEffect(() => {
    setLoading(true);
    getFilmsReviwers(movieId)
      .then(setReview)
      .catch((error) => {
        console.log(error);
      })
      .finally(setLoading(false));
  }, []);
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