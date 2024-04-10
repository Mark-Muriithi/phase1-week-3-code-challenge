// Your code here

console.log("test")

document.addEventListener("DOMContentLoaded", function() {
    const ul = document.getElementById("films");
    const poster = document.getElementById("poster");
    const title = document.getElementById("title");
    const runtime = document.getElementById("runtime");
    const description = document.getElementById("film-info");
    const showtime = document.getElementById("showtime");
    const ticketNum = document.getElementById("ticket-num");
    const buyButton = document.getElementById("buy-ticket");

    // Function to fetch movie data and populate the movie list
    function populateMovieList() {
        fetch("http://localhost:3000/films")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            data.forEach(movie => {
                const li = document.createElement("li");
                li.textContent = movie.title;
                li.classList.add("film", "item");
                li.dataset.movieId = movie.id; // Assuming each movie has an ID
                ul.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching movie data:", error));
    }

    // Function to display movie details when a movie is clicked
    function displayMovieDetails(movieId) {
        fetch(`http://localhost:3000/films/${movieId}`)
        .then(response => response.json())
        .then(movie => {
            poster.src = movie.poster;
            title.textContent = movie.title;
            runtime.textContent = `${movie.runtime} minutes`;
            description.textContent = movie.description;
            showtime.textContent = movie.showtime;
            ticketNum.textContent = movie.remaining_tickets;
            buyButton.disabled = movie.remaining_tickets === 0;
        })
        .catch(error => console.error("Error fetching movie details:", error));
    }

    // Event listener for movie selection
    ul.addEventListener("click", function(event) {
        if (event.target && event.target.matches("li.film.item")) {
            const movieId = event.target.dataset.movieId;
            displayMovieDetails(movieId);
        }
    });

    // Event listener for buying tickets
    buyButton.addEventListener("click", function() {
        const movieId = ul.querySelector(".selected").dataset.movieId;
        // Call function to buy tickets
        buyTickets(movieId);
    });

    // Function to buy tickets
    function buyTickets(movieId) {
        // Implement functionality to buy tickets, possibly sending a request to the server
    }

    // Remove the placeholder movie list item
    const placeholderLi = document.querySelector("#films .film.item");
    if (placeholderLi) {
        placeholderLi.remove();
    }

    // Populate the movie list on page load
    populateMovieList();
});
