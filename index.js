// async function getmovie() {
//   const url = "https://freetestapi.com/api/v1/movies";
//   try {
//     const response = await fetch(url);
//     console.log(response, "response");
//     const result = await response.json();
//     console.log(result, "result");
//   } catch (error) {
//     console.error(error);
//   }
// }

document.addEventListener("DOMContentLoaded", () => {
  const APIURL = "https://freetestapi.com/api/v1/movies";
  console.log(APIURL)
  const form = document.getElementById("form");
  const search = document.getElementById("search");
  const moviesContainer = document.getElementById("moviesContainer");
  const slideshow = document.getElementById("slideshow");

  fetchMovies(APIURL);
  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const contact = document.getElementById("contact").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // console.log("getMOvie");
      // getmovie();

      if (name && contact && email && password) {
        const user = {
          name: name,
          contact: contact,
          email: email,
          password: password,
        };

        localStorage.setItem("user", JSON.stringify(user));
        alert("Signup Successful");

        window.location.href = "login.html";
      } else {
        alert("All fields are required");
      }
    });
  }

  //   login Form

  const loginForm = document.getElementById("loginForm");

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const storeUser = JSON.parse(localStorage.getItem("user"));

      if (
        storeUser &&
        storeUser.email === email &&
        storeUser.password === password
      ) {
        alert("Login Successful");
        window.location.href = "index.html";
      } else {
        alert("Invalid Credentials");
      }
    });
  }

  // slideshow

  if (slideshow) {
    const images = [
      "https://images.unsplash.com/photo-1572188863110-46d457c9234d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW92aWVzJTIwcG9zdGVyc3xlbnwwfHwwfHx8MA%3D%3D ?text=Movie+1",
      "https://images.unsplash.com/photo-1606603696914-a0f46d934b9c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bW92aWVzJTIwcG9zdGVyc3xlbnwwfHwwfHx8MA%3D%3D ?text=Movie+2",
      "https://images.unsplash.com/photo-1659652603378-22f82bedde0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1vdmllcyUyMHBvc3RlcnN8ZW58MHx8MHx8fDA%3D ?text=Movie+3",
    ];

    let currentIndex = 0;
    function showImage(index) {
      slideshow.innerHTML = `<img src="${images[index]}"style="width:100%">`;
    }

    showImage(currentIndex);
    setInterval(() => {
      currentIndex = (currentIndex + 1) % Image.length;
      showImage(currentIndex);
    }, 2000);
  }

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const searchTerm = search.value;

      if (searchTerm && searchTerm !== '') {
        fetchMovies(APIURL , searchTerm);
        search.value = '';
      } else {
        // window.location.reload();
        fetchMovies(APIURL);
      }
    });
  }

  function fetchMovies(url) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data, "data.results");
        displayMovies(data);
      });
  }

  function displayMovies(movies) {
    if (!moviesContainer) {
      console.error("Movies Container not found");
      return;
    }
    moviesContainer.innerHTML = "";
    console.log(movies);

    movies.forEach((movie) => {
      console.log(movie);

      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <img src={movie.poster} alt="${movie.title}">
        <h3>${movie.title}</h3> 
      `;

      moviesContainer.appendChild(movieElement);
    });
  }
});
