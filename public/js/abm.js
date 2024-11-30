const btnAgregar = document.getElementById("icon");
const btnEditar = document.querySelectorAll(".btnEditar");
const btnEliminar = document.querySelectorAll(".btnEliminar");
const btnActivar = document.querySelectorAll(".btnActivar");

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
let iconoToggler = document.getElementById("iconoToggler");
iconoToggler.addEventListener("click", cambiarIconoSegunTema);

//menu responsive
const nav = document.getElementById("nav");
const abrir = document.getElementById("abrir");
const cerrar = document.getElementById("cerrar");

abrir.addEventListener("click", () => {
  nav.classList.add("visible");
});

cerrar.addEventListener("click", () => {
  nav.classList.remove("visible");
});

function createModal({
  title = "Modal Title",
  body = "Modal Body",
  footer = "",
  size = "md",
}) {
  const modalId = "dynamicModal";

  // Crear el modal
  const modalHtml = `
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}Label" aria-hidden="true">
        <div class="modal-dialog modal-${size}">
            <div class="modal-content">
              <div class="modal-header">
              <h5 class="modal-title" id="${modalId}Label">${title}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                ${body}
                </div>
                <div class="modal-footer">
                ${footer}
                </div>
                </div>
                </div>
                </div>
                `;

  // Insertar el modal en el body
  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Mostrar el modal
  const modalElement = new bootstrap.Modal(document.getElementById(modalId));
  modalElement.show();

  // Eliminar el modal del DOM cuando se cierra
  document.getElementById(modalId).addEventListener("hidden.bs.modal", () => {
    document.getElementById(modalId).remove();
  });
}

btnAgregar.addEventListener("click", () => {
  createModal({
    title: "Agregar producto",
    body: `
      <form id="frmAgregarProducto" enctype="multipart/form-data">
      <div class="mb-3 d-flex flex-column align-items-center">
      <label class="mb-2" for="">Seleccione el producto</label>
      <div class="form-check">
      <input
      class="form-check-input"
      type="radio"
      name="descripcion"
      id="rbPelicula"
      value="Pelicula" 
      checked
      />
      <label class="form-check-label" for="rbPelicula">
      Pelicula
      </label>
      </div>
      <div class="form-check">
      <input
      class="form-check-input"
      type="radio"
      name="descripcion"
              id="rbJuego"
              value="Juego"
            />
            <label class="form-check-label" for="rbJuego">
            Juego
            </label>
            </div>
            </div>
            <div class="row mb-3">
            <label for="pNombre" class="col-sm-2 col-form-label">Nombre</label>
            <div class="col-sm-10">
            <input  type="text" class="form-control" id="pNombre" name="nombre"/>
            </div>
            </div>
            <div class="row mb-3">
            <label for="pPrecio" class="col-sm-2 col-form-label">Precio</label>
          <div class="col-sm-10">
          <input  type="number" class="form-control" id="pPrecio"  name="precio"/>
          </div>
          </div>
          <div class="row mb-3">
          <label for="pPortada" class="col-sm-2 col-form-label"
          >Portada</label
          >
          <div class="col-sm-10">
          <input class="form-control" type="file" id="image" name="portada" accept="image/*"  />
          </div>
          </div>
        <div class="d-flex justify-content-center">
          <button type="submit" id="submit" class="btn btn-primary">Agregar</button>
        </div>
      </form>`,
    footer: "",
    size: "md",
  });

  const form = document.getElementById("frmAgregarProducto");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    // Crear FormData directamente desde el formulario
    const formData = new FormData(form);

    // Llamar a la función para enviar los datos
    const result = await insertarDatos(formData);
    if (result.status === 200) {
      Swal.fire({
        text: `${result.mensaje}`,
        icon: "success",
        customClass: {
          popup: "popup",
          confirmButton: "confirmButton",
        },
      });

      document.getElementById("submit").setAttribute("disabled", "true");

      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      Swal.fire({
        text: `${result.mensaje}`,
        icon: "info",
        customClass: {
          popup: "popup",
          confirmButton: "confirmButton",
        },
      });
    }
  });
});

btnEditar.forEach((boton) => {
  boton.addEventListener("click", async () => {
    try {
      const idProducto = boton.id;
      const response = await fetch(`/abm/${idProducto}`);
      const producto = await response.json();

      if (producto.status === 400) {
        Swal.fire({
          text: `${producto.mensaje}`,
          icon: "error",
          customClass: {
            popup: "popup",
            confirmButton: "confirmButton",
          },
        });
      } else {
        createModal({
          title: "Editar producto",
          body: `
            <form id="frmEditarProducto" enctype="multipart/form-data">
              <div class="mb-3 d-flex flex-column align-items-center">
                <label class="mb-2" for="">Seleccione el producto</label>
                <div class="form-check">
                  <input
                  class="form-check-input"
                    type="radio"
                    name="descripcion"
                    id="rbPelicula"
                    value="Pelicula" 
                    checked
                    />
                    <label class="form-check-label" for="rbPelicula">
                    Pelicula
                    </label>
                    </div>
                    <div class="form-check">
                    <input
                    class="form-check-input"
                    type="radio"
                    name="descripcion"
                    id="rbJuego"
                    value="Juego"
                  />
                  <label class="form-check-label" for="rbJuego">
                  Juego
                  </label>
                  </div>
                  </div>
                  <div class="row mb-3">
                  <label for="pNombre" class="col-sm-2 col-form-label">Nombre</label>
                <div class="col-sm-10">
                  <input required type="text" class="form-control" id="pNombre" name="nombre" 
                  value="${producto.nombre}"/>
                  </div>
                  </div>
                  <div class="row mb-3">
                <label for="pPrecio" class="col-sm-2 col-form-label">Precio</label>
                <div class="col-sm-10">
                <input required type="number" class="form-control" id="pPrecio" min="0" name="precio" value="${producto.precio}"/>
                </div>
                </div>
                <div class="row mb-3">
                <label for="pPortada" class="col-sm-2 col-form-label"
                  >Portada</label
                >
                <div class="col-sm-10">
                <input class="form-control" type="file" id="image" name="portada" accept="image/*"/>
                </div>
                </div>
                <div class="d-flex justify-content-center">
                <button type="submit" id="submit" class="btn btn-primary">Editar</button>
                </div>
                </form>`,
          footer: "",
          size: "md",
        });
        const form = document.getElementById("frmEditarProducto");
        form.addEventListener("submit", async (e) => {
          e.preventDefault();
          const formData = new FormData(form);
          const result = await editarProducto(formData, idProducto);
          if (result.status === 200) {
            Swal.fire({
              text: `${result.mensaje}`,
              icon: "success",
              customClass: {
                popup: "popup",
                confirmButton: "confirmButton",
              },
            });
            document.getElementById("submit").setAttribute("disabled", "true");
            setTimeout(() => {
              location.reload();
            }, 2000);
          } else {
            Swal.fire({
              text: `${result.mensaje}`,
              icon: "error",
              customClass: {
                popup: "popup",
                confirmButton: "confirmButton",
              },
            });
          }
        });
      }
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
  });
});

btnEliminar.forEach((boton) => {
  boton.addEventListener("click", async () => {
    try {
      const idProducto = boton.id;
      const response = await fetch(`/abm/${idProducto}`);
      const result = response.json();
      if (response.ok) {
        const result = await eliminarProducto(idProducto);
        if (result.status === 200) {
          Swal.fire({
            text: `${result.mensaje}`,
            icon: "success",
            customClass: {
              popup: "popup",
              confirmButton: "confirmButton",
            },
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } else {
        Swal.fire({
          text: `${result.mensaje}`,
          icon: "error",
          customClass: {
            popup: "popup",
            confirmButton: "confirmButton",
          },
        });
      }
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
  });
});

btnActivar.forEach((boton) => {
  boton.addEventListener("click", async () => {
    try {
      const idProducto = boton.id;
      const response = await fetch(`/abm/${idProducto}`);
      const result = response.json();
      if (response.ok) {
        const result = await reactivarProducto(idProducto);
        if (result.status === 200) {
          Swal.fire({
            text: `${result.mensaje}`,
            icon: "success",
            customClass: {
              popup: "popup",
              confirmButton: "confirmButton",
            },
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } else {
        Swal.fire({
          text: `${result.mensaje}`,
          icon: "error",
          customClass: {
            popup: "popup",
            confirmButton: "confirmButton",
          },
        });
      }
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
  });
});

async function insertarDatos(formData) {
  try {
    const pedido = await fetch("/abm", {
      method: "POST",
      body: formData,
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

async function editarProducto(formData, idProducto) {
  try {
    const pedido = await fetch(`/abm/${idProducto}`, {
      method: "PUT",
      body: formData,
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

async function eliminarProducto(idProducto) {
  try {
    const pedido = await fetch(`/abm/${idProducto}`, {
      method: "DELETE",
    });
    return await pedido.json();
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

async function reactivarProducto(idProducto) {
  try {
    const pedido = await fetch(`/abm/${idProducto}`, {
      method: "PATCH",
    });
    return await pedido.json();
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
