import { makingReviewCards } from "./dom-helpers";
import { getMovieReviews, setLocalStorageKey } from "./local-storage-handlers";

export const handleMovieSubmit = (event) => {
  event.preventDefault();

  const form = event.target;
  const title = form.movieTitle.value; 
  const criticScore = form.criticScore.value;
  const audienceScore = form.audienceScore.value;
  const domestic = form.domesticGrossSales.value;
  const genre = form.genre.value; 

  const reviews = getMovieReviews();
  reviews.unshift({ title, criticScore, audienceScore, domestic, genre}); 

  setLocalStorageKey("reviews", reviews);
  makingReviewCards();
  form.reset();
}

export const resetMovies = () => {
  document.getElementById("reset").addEventListener("click", function() {
    localStorage.removeItem("reviews");
  
    // Reload the page to reset to default movies
    location.reload();
  });
}