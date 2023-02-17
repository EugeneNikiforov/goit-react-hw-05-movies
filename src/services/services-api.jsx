const API = "https://api.themoviedb.org/3";
const API_KEY = "685ecda235ca7f8d71227162f76cc55e";

const getRecomendation = async (page) => {
  return await fetch(
    `${API}/trending/movie/week?api_key=${API_KEY}&page=${page}`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing found`));
  });
};

const getFilmsById = async (movieId) => {
  return await fetch(
    `${API}/movie/${movieId}?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing found`));
  });
};

const getFilmsCredits = async (movieId) => {
  return await fetch(
    `${API}/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing found`));
  });
};

const getFilmsReviwers = async (movieId) => {
  return await fetch(
    `${API}/movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing found`));
  });
};

const getFilmsForSearch = async (value, page) => {
  return await fetch(
    `${API}/search/movie?api_key=${API_KEY}&language=en-US&${value}&page=${page}&include_adult=false`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Nothing found`));
  });
};

export {
  getRecomendation,
  getFilmsById,
  getFilmsCredits,
  getFilmsReviwers,
  getFilmsForSearch,
};