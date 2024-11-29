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

function traerCarritoLocalStorage() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  return carrito;
}

function actualizarNumeritoCarrito() {
  let acumuladorCarrito = 0;
  carrito.forEach((element) => {
    acumuladorCarrito += element.cantidad;
  });
  numeritoCarrito.innerText = acumuladorCarrito;
}

function agregarAlCarrito(producto) {
  Toastify({
    text: `"${producto.nombre} agregado al carrito"`,
    duration: 2000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      textTransform: "uppercase",
    },
    onClick: function () {}, // Callback after click
  }).showToast();

  const productoEnCarrito = carrito.find((item) => item.id === producto.id);

  if (productoEnCarrito) {
    productoEnCarrito.cantidad += 1;
  } else {
    producto.cantidad = 1;
    carrito.push(producto);
  }
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarNumeritoCarrito();
}

async function traerProductoPorId(idProducto) {
  try {
    const respuesta = await fetch(`/pantalla-productos/${idProducto}`);

    if (!respuesta.ok) {
      throw new Error("Error al obtener los datos del producto");
    }

    const producto = await respuesta.json();

    agregarAlCarrito(producto);

    console.log(`Producto ${producto.nombre} añadido al carrito`);
  } catch (error) {
    console.error("Hubo un error al añadir el producto al carrito:", error);
  }
}

// llamo a la funcion y se la asigno a window.onload (cuando carga la pagina).
window.onload = () => {
  temaLocalStorage();
  actualizarNumeritoCarrito();
};

//evento click enviado al icono.
let body = document.querySelector("body");
let html = document.getElementsByTagName("html")[0];
let iconoToggler = document.getElementById("iconoToggler");
iconoToggler.addEventListener("click", cambiarIconoSegunTema);

//menu hamburguesa responsive
const nav = document.getElementById("nav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

let carrito = traerCarritoLocalStorage();
let btnAñadir = document.querySelectorAll(".aniadir");
const numeritoCarrito = document.getElementById("numerito");

btnAñadir.forEach((boton) => {
  boton.addEventListener("click", () => {
    const idProducto = boton.id;
    traerProductoPorId(idProducto);
  });
});

export { cambiarIconoSegunTema, temaLocalStorage };
