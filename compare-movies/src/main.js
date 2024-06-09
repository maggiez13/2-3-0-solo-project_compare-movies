import './style.css'
import reviewsFromJSON from "../../movie-data.json"
import { getMovieReviews, setLocalStorageKey } from '../js/local-storage-handlers'
import { makingReviewCards } from '../js/dom-helpers'
import { handleMovieSubmit, resetMovies } from "../js/event-handlers"


const main = () => {
  const localReviews = getMovieReviews();
  if (!localReviews || localReviews.length === 0) {
    setLocalStorageKey("reviews", reviewsFromJSON);
  }

  makingReviewCards();

  document.querySelector("#movie-form-header").addEventListener("submit", handleMovieSubmit);

  resetMovies();
}

main();