document.addEventListener('DOMContentLoaded', () => {
    const movieDetailsContainer = document.getElementById('movie-details');
    const movieListContainer = document.getElementById('movie-list');
  
    // Function to render movie details
    const renderMovieDetails = (movie) => {
      const {
        title,
        runtime,
        showtime,
        tickets_sold,
        capacity,
        poster
      } = movie;
  
      const availableTickets = capacity - tickets_sold;
  
      // Clear previous movie details
      movieDetailsContainer.innerHTML = '';
  
      // Create elements for movie details
      const movieTitle = document.createElement('h3');
      movieTitle.textContent = title;
  
      const posterContainer = document.createElement('div');
      posterContainer.classList.add('poster-container');
  
      const moviePoster = document.createElement('img');
      moviePoster.classList.add('poster');
      moviePoster.src = poster;
      moviePoster.alt = 'Movie Poster';
  
      const runtimeElement = document.createElement('p');
      runtimeElement.innerHTML = `<strong>Runtime:</strong> ${runtime}`;
  
      const showtimeElement = document.createElement('p');
      showtimeElement.innerHTML = `<strong>Showtime:</strong> ${showtime}`;
  
      const availableTicketsElement = document.createElement('p');
      availableTicketsElement.innerHTML = `<strong>Available Tickets:</strong> ${availableTickets}`;
  
      const buyTicketButton = document.createElement('button');
      buyTicketButton.textContent = 'Buy Ticket';
      buyTicketButton.addEventListener('click', () => {
        if (availableTickets > 0) {
          availableTicketsElement.textContent = `Available Tickets: ${availableTickets - 1}`;
          // Add logic to handle ticket purchase here
        } else {
          alert('Sorry, no more tickets available!');
        }
      });
  
      // Append movie details elements to the container
      posterContainer.appendChild(moviePoster);
      movieDetailsContainer.appendChild(movieTitle);
      movieDetailsContainer.appendChild(posterContainer);
      movieDetailsContainer.appendChild(runtimeElement);
      movieDetailsContainer.appendChild(showtimeElement);
      movieDetailsContainer.appendChild(availableTicketsElement);
      movieDetailsContainer.appendChild(buyTicketButton);
    };
  
    // Function to render movie list
    const renderMovieList = (movies) => {
      movieListContainer.innerHTML = '';
  
      movies.forEach((movie) => {
        const { id, title } = movie;
  
        const movieItem = document.createElement('li');
        movieItem.textContent = title;
        movieItem.addEventListener('click', () => {
          renderMovieDetails(movie);
        });
  
        movieListContainer.appendChild(movieItem);
      });
    };
  
    // Fetch first movie details
    fetch('http://localhost:4000/films/1')
      .then(response => response.json())
      .then(movie => {
        renderMovieDetails(movie);
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  
    // Fetch all movies
    fetch('http://localhost:4000/films')
      .then(response => response.json())
      .then(movies => {
        renderMovieList(movies);
      })
      .catch(error => {
        console.log('An error occurred:', error);
      });
  });
  