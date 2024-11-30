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
function traerNombreUsuarioLocalStorage() {
  let nombre = localStorage.getItem("nombreUsuario");
  return nombre;
}

function createHtmlCarrito() {
  let acumuladorTotal = 0;
  let productosCarrito = traerCarritoLocalStorage();
  const contenedor = document.getElementById("carritoProductos");
  contenedor.innerHTML = "";

  if (productosCarrito.length > 0) {
    productosCarrito.forEach((element) => {
      let subtotal = element.precio * element.cantidad;
      acumuladorTotal += subtotal;
      contenedor.innerHTML += `
        <div class="carritoProducto">
          <div class="carritoProductoInfo">
            <div class="divimg">
              <img class="carritoProductoImagen" src="./uploads/${element.portada}" alt="${element.nombre}" />
            </div>
            <div class="carritoProductoTitulo">
              <small>TITULO</small>
              <h3>${element.nombre}</h3>
            </div>
            <div class="carritoProductoCantidad">
              <small>CANTIDAD</small>
              <div class="selectorCantidad">
                <i class="bi bi-dash-circle disminuir" id="${element.id}"></i>
                <p>${element.cantidad}</p>
                <i class="bi bi-plus-circle aumentar" id="${element.id}"></i>
              </div>
            </div>
          </div>
          <div class="carritoProductoPrecioSubtotal">
            <div class="carritoProductoPrecio">
              <small>PRECIO</small>
              <p>${element.precio}</p>
            </div>
            <div class="carritoProductoSubtotal">
              <small>SUBTOTAL</small>
              <p>${subtotal}</p>
            </div>
          </div>
          <div class="carritoProductoEliminar">
            <button class="btnEliminar borrar" id="${element.id}">
              <i class="bi bi-trash-fill"></i>
            </button>
          </div>
        </div>      
      `;
    });
    contenedor.innerHTML += `
    <div id="carritoAcciones" class="carritoAcciones">
                <div class="carritoAccionesIzquierda">
                  <a
                    class="carritoAccionesVolver"
                    href="/pantalla-productos"
                  >
                    <i class="bi bi-arrow-return-left"></i> SEGUIR COMPRANDO
                  </a>
                  <button
                    class="carritoAccionesVaciar"
                    id="carritoAccionesVaciar"
                  >
                    VACIAR CARRITO
                  </button>
                </div>
                <div class="carritoAccionesDerecha">
                  <div class="carritoAccionesTotal">
                    <p>TOTAL:</p>
                    <p id="total">${acumuladorTotal}</p>
                  </div>
                  <button
                    class="carritoAccionesComprar"
                    id="carritoAccionesComprar"
                  >
                    COMPRAR
                  </button>
                </div>
              </div>
    `;
  } else {
    contenedor.innerHTML += `
    <div class="carritoProducto">
    <p>Tu carrito está vacío.</p>
    </div>
    <div id="carritoAcciones" class="carritoAcciones">
                <div class="carritoAccionesIzquierda">
                  <a
                    class="carritoAccionesVolver"
                    href="/pantalla-productos"
                  >
                    <i class="bi bi-arrow-return-left"></i> SEGUIR COMPRANDO
                  </a>
                </div>
              </div>
    `;
  }
}

// funcion para vaciar todo el carrito completo.
function vaciarCarrito() {
  let botonVaciar = document.getElementById("carritoAccionesVaciar");
  botonVaciar.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se van a borrar todos los productos del carrito.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        popup: "swal2-custom-popup",
        title: "swal2-custom-title",
        confirmButton: "swal2-custom-button",
        cancelButton: "swal2-custom-button",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("carrito");
        createHtmlCarrito();
        reasignarEventosAElementos();
      }
    });
  });
}

// funcion para eliminar el producto que quiere el usuario.
function vaciarProducto() {
  let carrito = traerCarritoLocalStorage();
  let botonCarritoProductoEliminar = document.querySelectorAll(".borrar");

  botonCarritoProductoEliminar.forEach((boton) => {
    boton.addEventListener("click", () => {
      let idProducto = parseInt(boton.id);
      let productoEliminado = carrito.find(
        (producto) => producto.id === idProducto
      );

      Toastify({
        text: `"${productoEliminado.nombre} eliminado del carrito"`,
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

      carrito = carrito.filter((producto) => producto.id !== idProducto);

      localStorage.setItem("carrito", JSON.stringify(carrito));
      createHtmlCarrito();
      reasignarEventosAElementos();
    });
  });
}

// funcion para hacer la compra.
function comprarProducto() {
  const botonCompra = document.getElementById("carritoAccionesComprar");

  botonCompra.addEventListener("click", async () => {
    Swal.fire({
      title: "¿Desea confirmar la compra?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí",
      cancelButtonText: "No",
      customClass: {
        popup: "swal2-custom-popup",
        title: "swal2-custom-title",
        confirmButton: "swal2-custom-button",
        cancelButton: "swal2-custom-button",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        const carrito = traerCarritoLocalStorage();
        const nombre = traerNombreUsuarioLocalStorage();

        if (carrito.length > 0) {
          try {
            const venta = {
              usuario: nombre,
              carrito,
            };

            const respuesta = await fetch("/carrito", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(venta),
            });

            if (respuesta.ok) {
              const data = await respuesta.json();
              Swal.fire({
                title: "Compra realizada",
                text: `Muchas gracias ${nombre} por tu compra!`,
                icon: "success",
                timer: 3000,
                showConfirmButton: false,
                customClass: {
                  popup: "swal2-custom-popup",
                  title: "swal2-custom-title",
                  confirmButton: "swal2-custom-button",
                  cancelButton: "swal2-custom-button",
                },
              });
              localStorage.removeItem("carrito");
              setTimeout(() => {
                window.location.href = `/ticket/${data.ventaId}`;
              }, 3000);
            } else {
              console.error("Error al realizar la compra.");
            }
          } catch (error) {
            console.error("Error en la solicitud:", error);
          }
        }
      }
    });
  });
}

//funcion para aumentar la cantidad del producto que esté en el carrito.
function aumentarCantidadProductoEnCarrito() {
  let carrito = traerCarritoLocalStorage();
  let btnAumentar = document.querySelectorAll(".aumentar");

  btnAumentar.forEach((boton) => {
    boton.addEventListener("click", () => {
      let idProducto = parseInt(boton.id);
      let productoEnCarrito = carrito.find(
        (element) => element.id === idProducto
      );

      if (productoEnCarrito) {
        Toastify({
          text: `"${productoEnCarrito.nombre} sumado"`,
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

        productoEnCarrito.cantidad += 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        createHtmlCarrito();
        reasignarEventosAElementos();
      }
    });
  });
}

//funcion para disminuir la cantidad del producto que esté en el carrito.
function disminuirCantidadProductoEnCarrito() {
  let carrito = traerCarritoLocalStorage();
  let btnDisminuir = document.querySelectorAll(".disminuir");

  btnDisminuir.forEach((boton) => {
    boton.addEventListener("click", () => {
      let idProducto = parseInt(boton.id);
      let productoEnCarrito = carrito.find(
        (element) => element.id === idProducto
      );

      if (productoEnCarrito && productoEnCarrito.cantidad > 1) {
        Toastify({
          text: `"${productoEnCarrito.nombre} restado"`,
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

        productoEnCarrito.cantidad -= 1;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        createHtmlCarrito();
        reasignarEventosAElementos();
      } else {
        Toastify({
          text: "la cantidad del producto no puede ser cero.",
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
      }
    });
  });
}

// funcion que llama a aumentar y disminuir.
function actualizarCantidadProductos() {
  aumentarCantidadProductoEnCarrito();
  disminuirCantidadProductoEnCarrito();
}

// funcion para reasignar eventos a los elementos despues de recargar el html.
function reasignarEventosAElementos() {
  vaciarCarrito();
  vaciarProducto();
  comprarProducto();
  actualizarCantidadProductos();
}

window.onload = function () {
  temaLocalStorage();
  createHtmlCarrito();
  reasignarEventosAElementos();
};

//evento click enviado al icono.
let body = document.querySelector("body");
let html = document.getElementsByTagName("html")[0];
let iconoToggler = document.getElementById("iconoToggler");
iconoToggler.addEventListener("click", cambiarIconoSegunTema);
