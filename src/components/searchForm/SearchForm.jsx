import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { ImSearch } from "react-icons/im";
import PropTypes from "prop-types";
import styled from "./SearchForm.module.scss";

export default function SearchForm({ newSearch, newPage }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    const movieValue = event.currentTarget.elements.query.value.toLowerCase();
    if (movieValue.trim() === "") {
      toast.error("Please enter some value!");
      return;
    }
    setSearchParams({
      query: movieValue,
    });
  };

  useEffect(() => {
    newSearch([]);
    newPage(1);
  }, [searchParams]);

  return (
    <div>
      <form className={styled.container} onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          autoComplete="off"
          placeholder="Search films"
        />
        <button className={styled.search} type="submit">
          <ImSearch className={styled.button_search} />
        </button>
      </form>
    </div>
  );
}

SearchForm.propTypes = {
  newSearch: PropTypes.func.isRequired,
  newPage: PropTypes.func.isRequired,
};