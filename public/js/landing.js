function alertarNombre() {
  let nombre = document.getElementById("inputNombre").value;

  if (nombre !== "") {
    //- Hacer una validacion al input -
    localStorage.setItem("nombreUsuario", nombre);
    location.href = "/pantalla-productos";
  } else {
    Toastify({
      text: "Debe ingresar un nombre.",
      duration: 2000,
      close: true,
      gravity: "bottom", // top or bottom
      position: "center", // left, center or right
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        textTransform: "uppercase",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
}

//funcion para cambiar el icono según el tema y lo guarda en localStorage.
function cambiarIconoSegunTema() {
  if (html.getAttribute("data-bs-theme") == "light") {
    iconoToggler.classList.remove("bi-brightness-high-fill");
    iconoToggler.classList.add("bi-moon-stars-fill");
    html.setAttribute("data-bs-theme", "dark");

    body.classList.add("dark-mode");

    localStorage.setItem("theme", "dark");
  } else {
    iconoToggler.classList.add("bi-brightness-high-fill");
    iconoToggler.classList.remove("bi-moon-stars-fill");
    html.setAttribute("data-bs-theme", "light");

    body.classList.remove("dark-mode");

    localStorage.setItem("theme", "light");
  }
}

//funcion que obtiene el tema del local storage guardado antes y setea el tema de la pagina.
function temaLocalStorage() {
  let tema = localStorage.getItem("theme");
  switch (tema) {
    case "dark":
      iconoToggler.classList.remove("bi-brightness-high-fill");
      iconoToggler.classList.add("bi-moon-stars-fill");
      html.setAttribute("data-bs-theme", "dark");
      body.classList.add("dark-mode");
      break;
    case (null, "light"):
      iconoToggler.classList.add("bi-brightness-high-fill");
      iconoToggler.classList.remove("bi-moon-stars-fill");
      html.setAttribute("data-bs-theme", "light");
      body.classList.remove("dark-mode");
      break;
  }
}
// llamo a la funcion y se la asigno a window.onload (cuando carga la pagina).
window.onload = temaLocalStorage;

//evento click enviado al icono.
let body = document.querySelector("body");
let html = document.getElementsByTagName("html")[0];
let iconoToggler = document.getElementById("iconoToggler");
iconoToggler.addEventListener("click", cambiarIconoSegunTema);

//evento click asociado al boton aceptar del form.
let btnAceptar = document.getElementById("btnAceptar");
btnAceptar.addEventListener("click", alertarNombre);
