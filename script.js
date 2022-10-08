// API_KEY 1ea1ae09

//Title: http://www.omdbapi.com/?s=thor&page=1&apikey=1ea1ae09
// Info: http://www.omdbapi.com/?i=tt0800369&apikey=1ea1ae09

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

//load movies from API;

async function loadMovies(searchTerm) {
  // dynamic api call
  const URL = ` https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=1ea1ae09`;
  // response
  const res = await fetch(`${URL}`);
  const data = await res.json();
  // console.log(data.Search);
  if (data.Response === "True") displayMovieList(data.Search);
}

function findMovies() {
  // search for the movies in the movie search box element
  let searchTerm = movieSearchBox.value.trim();
  if (searchTerm.length > 0) {
    searchList.classList.remove("hide-search-list");
    loadMovies(searchTerm);
  } else searchList.classList.add("hide-search-list");
}

function displayMovieList(movies) {
  searchList.innerHTML = "";
  for (let i = 0; i < movies.length; i++) {
    let movieListItem = document.createElement("div");
    // setting movie id in data.id
    movieListItem.dataset.id = movies[i].imdbID;
    // adding the new element to the container with the new id
    movieListItem.classList.add("search-list-item");
    if (movies[i].Poster !== "N/A") moviePoster = movies[i].Poster;
    else moviePoster = "image_not_found.jpg";

    //update the innerHTML with dynamic capabilities
    movieListItem.innerHTML = `<div class="search-item-thumbnail">
        <img src="${moviePoster}">
    </div>
    <div class="search-item-info">
        <h3>${movies[i].Title}</h3>
        <p>${movies[i].Year}</p>
    </div>`;
    searchList.appendChild(movieListItem);
  }
  loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        // when the movie is clicked, return the movies id
        movie.addEventListener('click', async () => {
            console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.valiue = "";
            const response = await fetch(`http://www.omdbapi.com/?i=${movie.dataset.id}&apikey=1ea1ae09`);
            const movieDetails = await response.json();
            console.log(movieDetails)
            displayMovieDetails(movieDetails);
        })
    })
}

function displayMovieDetails(details){
    resultGrid.innerHTML = ` <div class="movie-poster">
    <img src="${details.Poster !== "N/A" ? details.Poster : "image_not_found.jpg"}" alt="movie-poster" />
  </div>
  <div class="movie-info">
    <h3 class="movie-title"> ${details.Title}</h3>
    <ul class="movie-misc-info">
      <li class="year">Year: ${details.Year}</li>
      <li class="rated">Rating: ${details.Rated}</li>
      <li class="released">Released: ${details.Released}</li>
    </ul>
    <p class="genre"><b>Genre:</b> ${details.Genre}</p>
    <p class="director">
    <b>Director: </b> ${details.Director} 
    </p>
    <p class="writer">
      <b>Writers:</b> ${details.Writer}
    </p>
    <p class="actors">
      <b>Actors:</b> ${details.Actors}
    </p>
    <p class="plot">
      <b>Plot:</b> ${details.Plot}
    </p>
    <p class="metascore">
     <b>Metascore: </b> ${details.Metascore}/100  
    </p>
    <p class="imdb-rating">
    <b>IMDB Rating: </b> ${details.imdbRating}/10.0 
   </p>
    <p class="language"><b>Language:</b> ${details.Language}</p>
    <p class="awards">
      <b><i class="fas fa-award"></i>: </b> ${details.Awards}
    </p>
  </div>`
}


window.addEventListener('click', (event) => {
    if(event.target.className !== "form-control"){
        searchList.classList.add('hide-search-list');
    }
})