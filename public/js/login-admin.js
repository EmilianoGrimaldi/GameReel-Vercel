const user = document.getElementById("usuarioTxt");
const contrasenia = document.getElementById("passTxt");

//funcion que autocompleta los campos usuario y contraseña
function autocompletarLogin() {
  const usuario = "admin";
  const pass = "asdasd";
  document.getElementById("usuarioTxt").value = usuario;
  document.getElementById("passTxt").value = pass;
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

//evento click asociado al boton ingreso rapido.
let btnIngresoRapido = document.getElementById("btnIngresoRapido");
btnIngresoRapido.addEventListener("click", autocompletarLogin);

//evento click enviado al icono.
let body = document.querySelector("body");
let html = document.getElementsByTagName("html")[0];
let iconoToggler = document.getElementById("iconoToggler");
iconoToggler.addEventListener("click", cambiarIconoSegunTema);

const nav = document.getElementById("nav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

/* abrir.addEventListener("click", () => {
  nav.classList.add("visible");
}); */

/* cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
}); */

async function crearAdminAutomatico() {
  try {
    const pedido = await fetch("/admin");
  } catch (error) {
    Swal.fire({
      text: `${error}`,
      icon: "error",
      customClass: {
        popup: "popup",
        confirmButton: "confirmButton",
      },
    });
  }
}
crearAdminAutomatico();

async function loguear(datosInicioSesion) {
  try {
    const pedido = await fetch("/admin/login", {
      method: "POST",
      body: JSON.stringify(datosInicioSesion),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return pedido.json();
  } catch (error) {
    Swal.fire({
      text: `${error}`,
      icon: "error",
      customClass: {
        popup: "popup",
        confirmButton: "confirmButton",
      },
    });
  }
}

document.getElementById("btnIngresar").addEventListener("click", async (e) => {
  e.preventDefault();
  const user = document.getElementById("usuarioTxt").value;
  const contrasenia = document.getElementById("passTxt").value;

  const datosInicioSesion = {
    user: `${user}`,
    contrasenia: `${contrasenia}`,
  };

  const resultado = await loguear(datosInicioSesion);
  if (resultado.status !== 200) {
    Swal.fire({
      text: `${resultado.mensaje}`,
      icon: "error",
      customClass: {
        popup: "popup",
        confirmButton: "confirmButton",
      },
    });
  } else {
    window.location.href = "/abm";
  }
});
