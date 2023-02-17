import { useState, useEffect, useRef } from "react";
import {
  useParams,
  useLocation,
  Link,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";
import { getFilmsById } from "../../services/services-api";
import toast from "react-hot-toast";
import Publication from "../../components/publication/Publication";
import styled from "./SingleCard.module.scss";

export default function Singlecard() {
  const { movieId } = useParams();
  const [item, setItem] = useState(null);
  const location = useLocation();
  const oldLocation = useRef(location);
  const nav = useNavigate();
  useEffect(() => {
    getFilmsById(movieId)
      .then(setItem)
      .catch(() => toast.error("This page does not exist"));
  }, [movieId]);
  const returnButton = () => {
    nav(oldLocation?.current?.state?.from ?? "/");
  };
  return (
    <div className={styled.backgroundCard}>
      <button className={styled.fallback} onClick={returnButton}>
        Go back
      </button>
      {item && <Publication item={item} />}
      <div>
        <h2 className={styled.title}>Aditional information</h2>
        <NavLink className={styled.fallback} to="cast">
          Cast
        </NavLink>
        <NavLink className={styled.fallback} to="reviews">
          Reviews
        </NavLink>
        <Outlet />
      </div>
    </div>
  );
}