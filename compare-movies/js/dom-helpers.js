import { getMovieReviews, setLocalStorageKey } from "./local-storage-handlers";

// structure of review 
const makeReviewCardStructure = (parentElement, movieData) => {
  const { criticScore, audienceScore, domestic, genre, title } = movieData; 

  const li = document.createElement("li");
  li.classList.add("movie-card-container");

  const h3 = document.createElement("h3");
  h3.innerText = title;

  const criticScoreP = document.createElement("p");
  criticScoreP.innerText = `Critic Score: ${criticScore}%`;

  const audienceScoreP = document.createElement("p");
  audienceScoreP.innerText = `Audience Score: ${audienceScore}%`;

  const domesticP = document.createElement("p");
  domesticP.innerText = `Domestic Total: $${domestic.toLocaleString("en-US")}`;

  const genreP = document.createElement("p");
  genreP.innerText = `Genre: ${genre}`;

  li.append(h3, criticScoreP, audienceScoreP, domesticP, genreP);
  parentElement.append(li); 
}

// making actual review
export const makingReviewCards = () => {
  const reviews = getMovieReviews();
  const ul = document.getElementById("reviews-list");
  ul.innerHTML = "";
  console.log(reviews)
  reviews.forEach((review) => makeReviewCardStructure(ul, review));
}