document.addEventListener("DOMContentLoaded", () => {
  const APIURL =
    "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
  const IMGPATH = "https://image.tmdb.org/t/p/w1280";
  const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

  fetch(APIURL)
    .then((Response) => Response.json())
    .then((data) => {
      const moviesContainer = document.getElementById("movies");
      data.results.forEach((movie) => {
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie");
        movieElement.innerHTML = `<img src ="${
          IMGPATH + movie.poster_path
        }" alt ="${movie.title}">;
        <h3>${movie.title}</h3>`;
        moviesContainer.appendChild(movieElement);
      });
    });

  const signupForm = document.getElementById("signupForm");

  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const contact = document.getElementById("contact").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

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
});
