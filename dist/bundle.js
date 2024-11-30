/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./public/js/abm.js":
/*!**************************!*\
  !*** ./public/js/abm.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _pantalla_productos__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pantalla-productos */ \"./public/js/pantalla-productos.js\");\n/* harmony import */ var _pantalla_productos__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_pantalla_productos__WEBPACK_IMPORTED_MODULE_0__);\n\r\n\r\nconst btnAgregar = document.getElementById(\"icon\");\r\nconst btnEditar = document.querySelectorAll(\".btnEditar\");\r\nconst btnEliminar = document.querySelectorAll(\".btnEliminar\");\r\nconst btnActivar = document.querySelectorAll(\".btnActivar\");\r\n\r\n// llamo a la funcion y se la asigno a window.onload (cuando carga la pagina).\r\nwindow.onload = _pantalla_productos__WEBPACK_IMPORTED_MODULE_0__.temaLocalStorage;\r\n\r\n//evento click enviado al icono.\r\nlet iconoToggler = document.getElementById(\"iconoToggler\");\r\niconoToggler.addEventListener(\"click\", _pantalla_productos__WEBPACK_IMPORTED_MODULE_0__.cambiarIconoSegunTema);\r\n\r\n//menu responsive\r\nconst nav = document.getElementById(\"nav\");\r\nconst abrir = document.getElementById(\"abrir\");\r\nconst cerrar = document.getElementById(\"cerrar\");\r\n\r\nabrir.addEventListener(\"click\", () => {\r\n  nav.classList.add(\"visible\");\r\n});\r\n\r\ncerrar.addEventListener(\"click\", () => {\r\n  nav.classList.remove(\"visible\");\r\n});\r\n\r\nfunction createModal({\r\n  title = \"Modal Title\",\r\n  body = \"Modal Body\",\r\n  footer = \"\",\r\n  size = \"md\",\r\n}) {\r\n  const modalId = \"dynamicModal\";\r\n\r\n  // Crear el modal\r\n  const modalHtml = `\r\n        <div class=\"modal fade\" id=\"${modalId}\" tabindex=\"-1\" aria-labelledby=\"${modalId}Label\" aria-hidden=\"true\">\r\n        <div class=\"modal-dialog modal-${size}\">\r\n            <div class=\"modal-content\">\r\n              <div class=\"modal-header\">\r\n              <h5 class=\"modal-title\" id=\"${modalId}Label\">${title}</h5>\r\n                <button type=\"button\" class=\"btn-close\" data-bs-dismiss=\"modal\" aria-label=\"Close\"></button>\r\n                </div>\r\n                <div class=\"modal-body\">\r\n                ${body}\r\n                </div>\r\n                <div class=\"modal-footer\">\r\n                ${footer}\r\n                </div>\r\n                </div>\r\n                </div>\r\n                </div>\r\n                `;\r\n\r\n  // Insertar el modal en el body\r\n  document.body.insertAdjacentHTML(\"beforeend\", modalHtml);\r\n\r\n  // Mostrar el modal\r\n  const modalElement = new bootstrap.Modal(document.getElementById(modalId));\r\n  modalElement.show();\r\n\r\n  // Eliminar el modal del DOM cuando se cierra\r\n  document.getElementById(modalId).addEventListener(\"hidden.bs.modal\", () => {\r\n    document.getElementById(modalId).remove();\r\n  });\r\n}\r\n\r\nbtnAgregar.addEventListener(\"click\", () => {\r\n  createModal({\r\n    title: \"Agregar producto\",\r\n    body: `\r\n      <form id=\"frmAgregarProducto\" enctype=\"multipart/form-data\">\r\n      <div class=\"mb-3 d-flex flex-column align-items-center\">\r\n      <label class=\"mb-2\" for=\"\">Seleccione el producto</label>\r\n      <div class=\"form-check\">\r\n      <input\r\n      class=\"form-check-input\"\r\n      type=\"radio\"\r\n      name=\"descripcion\"\r\n      id=\"rbPelicula\"\r\n      value=\"Pelicula\" \r\n      checked\r\n      />\r\n      <label class=\"form-check-label\" for=\"rbPelicula\">\r\n      Pelicula\r\n      </label>\r\n      </div>\r\n      <div class=\"form-check\">\r\n      <input\r\n      class=\"form-check-input\"\r\n      type=\"radio\"\r\n      name=\"descripcion\"\r\n              id=\"rbJuego\"\r\n              value=\"Juego\"\r\n            />\r\n            <label class=\"form-check-label\" for=\"rbJuego\">\r\n            Juego\r\n            </label>\r\n            </div>\r\n            </div>\r\n            <div class=\"row mb-3\">\r\n            <label for=\"pNombre\" class=\"col-sm-2 col-form-label\">Nombre</label>\r\n            <div class=\"col-sm-10\">\r\n            <input  type=\"text\" class=\"form-control\" id=\"pNombre\" name=\"nombre\"/>\r\n            </div>\r\n            </div>\r\n            <div class=\"row mb-3\">\r\n            <label for=\"pPrecio\" class=\"col-sm-2 col-form-label\">Precio</label>\r\n          <div class=\"col-sm-10\">\r\n          <input  type=\"number\" class=\"form-control\" id=\"pPrecio\"  name=\"precio\"/>\r\n          </div>\r\n          </div>\r\n          <div class=\"row mb-3\">\r\n          <label for=\"pPortada\" class=\"col-sm-2 col-form-label\"\r\n          >Portada</label\r\n          >\r\n          <div class=\"col-sm-10\">\r\n          <input class=\"form-control\" type=\"file\" id=\"image\" name=\"portada\" accept=\"image/*\"  />\r\n          </div>\r\n          </div>\r\n        <div class=\"d-flex justify-content-center\">\r\n          <button type=\"submit\" id=\"submit\" class=\"btn btn-primary\">Agregar</button>\r\n        </div>\r\n      </form>`,\r\n    footer: \"\",\r\n    size: \"md\",\r\n  });\r\n\r\n  const form = document.getElementById(\"frmAgregarProducto\");\r\n  form.addEventListener(\"submit\", async (e) => {\r\n    e.preventDefault();\r\n    // Crear FormData directamente desde el formulario\r\n    const formData = new FormData(form);\r\n\r\n    // Llamar a la función para enviar los datos\r\n    const result = await insertarDatos(formData);\r\n    if (result.status === 200) {\r\n      Swal.fire({\r\n        text: `${result.mensaje}`,\r\n        icon: \"success\",\r\n        customClass: {\r\n          popup: \"popup\",\r\n          confirmButton: \"confirmButton\",\r\n        },\r\n      });\r\n\r\n      document.getElementById(\"submit\").setAttribute(\"disabled\", \"true\");\r\n\r\n      setTimeout(() => {\r\n        location.reload();\r\n      }, 2000);\r\n    } else {\r\n      Swal.fire({\r\n        text: `${result.mensaje}`,\r\n        icon: \"info\",\r\n        customClass: {\r\n          popup: \"popup\",\r\n          confirmButton: \"confirmButton\",\r\n        },\r\n      });\r\n    }\r\n  });\r\n});\r\n\r\nbtnEditar.forEach((boton) => {\r\n  boton.addEventListener(\"click\", async () => {\r\n    try {\r\n      const idProducto = boton.id;\r\n      const response = await fetch(`/abm/${idProducto}`);\r\n      const producto = await response.json();\r\n\r\n      if (producto.status === 400) {\r\n        Swal.fire({\r\n          text: `${producto.mensaje}`,\r\n          icon: \"error\",\r\n          customClass: {\r\n            popup: \"popup\",\r\n            confirmButton: \"confirmButton\",\r\n          },\r\n        });\r\n      } else {\r\n        createModal({\r\n          title: \"Editar producto\",\r\n          body: `\r\n            <form id=\"frmEditarProducto\" enctype=\"multipart/form-data\">\r\n              <div class=\"mb-3 d-flex flex-column align-items-center\">\r\n                <label class=\"mb-2\" for=\"\">Seleccione el producto</label>\r\n                <div class=\"form-check\">\r\n                  <input\r\n                  class=\"form-check-input\"\r\n                    type=\"radio\"\r\n                    name=\"descripcion\"\r\n                    id=\"rbPelicula\"\r\n                    value=\"Pelicula\" \r\n                    checked\r\n                    />\r\n                    <label class=\"form-check-label\" for=\"rbPelicula\">\r\n                    Pelicula\r\n                    </label>\r\n                    </div>\r\n                    <div class=\"form-check\">\r\n                    <input\r\n                    class=\"form-check-input\"\r\n                    type=\"radio\"\r\n                    name=\"descripcion\"\r\n                    id=\"rbJuego\"\r\n                    value=\"Juego\"\r\n                  />\r\n                  <label class=\"form-check-label\" for=\"rbJuego\">\r\n                  Juego\r\n                  </label>\r\n                  </div>\r\n                  </div>\r\n                  <div class=\"row mb-3\">\r\n                  <label for=\"pNombre\" class=\"col-sm-2 col-form-label\">Nombre</label>\r\n                <div class=\"col-sm-10\">\r\n                  <input required type=\"text\" class=\"form-control\" id=\"pNombre\" name=\"nombre\" \r\n                  value=\"${producto.nombre}\"/>\r\n                  </div>\r\n                  </div>\r\n                  <div class=\"row mb-3\">\r\n                <label for=\"pPrecio\" class=\"col-sm-2 col-form-label\">Precio</label>\r\n                <div class=\"col-sm-10\">\r\n                <input required type=\"number\" class=\"form-control\" id=\"pPrecio\" min=\"0\" name=\"precio\" value=\"${producto.precio}\"/>\r\n                </div>\r\n                </div>\r\n                <div class=\"row mb-3\">\r\n                <label for=\"pPortada\" class=\"col-sm-2 col-form-label\"\r\n                  >Portada</label\r\n                >\r\n                <div class=\"col-sm-10\">\r\n                <input class=\"form-control\" type=\"file\" id=\"image\" name=\"portada\" accept=\"image/*\"/>\r\n                </div>\r\n                </div>\r\n                <div class=\"d-flex justify-content-center\">\r\n                <button type=\"submit\" id=\"submit\" class=\"btn btn-primary\">Editar</button>\r\n                </div>\r\n                </form>`,\r\n          footer: \"\",\r\n          size: \"md\",\r\n        });\r\n        const form = document.getElementById(\"frmEditarProducto\");\r\n        form.addEventListener(\"submit\", async (e) => {\r\n          e.preventDefault();\r\n          const formData = new FormData(form);\r\n          const result = await editarProducto(formData, idProducto);\r\n          if (result.status === 200) {\r\n            Swal.fire({\r\n              text: `${result.mensaje}`,\r\n              icon: \"success\",\r\n              customClass: {\r\n                popup: \"popup\",\r\n                confirmButton: \"confirmButton\",\r\n              },\r\n            });\r\n            document.getElementById(\"submit\").setAttribute(\"disabled\", \"true\");\r\n            setTimeout(() => {\r\n              location.reload();\r\n            }, 2000);\r\n          } else {\r\n            Swal.fire({\r\n              text: `${result.mensaje}`,\r\n              icon: \"error\",\r\n              customClass: {\r\n                popup: \"popup\",\r\n                confirmButton: \"confirmButton\",\r\n              },\r\n            });\r\n          }\r\n        });\r\n      }\r\n    } catch (error) {\r\n      Swal.fire({\r\n        text: `${error}`,\r\n        icon: \"error\",\r\n        customClass: {\r\n          popup: \"popup\",\r\n          confirmButton: \"confirmButton\",\r\n        },\r\n      });\r\n    }\r\n  });\r\n});\r\n\r\nbtnEliminar.forEach((boton) => {\r\n  boton.addEventListener(\"click\", async () => {\r\n    try {\r\n      const idProducto = boton.id;\r\n      const response = await fetch(`/abm/${idProducto}`);\r\n      const result = response.json();\r\n      if (response.ok) {\r\n        const result = await eliminarProducto(idProducto);\r\n        if (result.status === 200) {\r\n          Swal.fire({\r\n            text: `${result.mensaje}`,\r\n            icon: \"success\",\r\n            customClass: {\r\n              popup: \"popup\",\r\n              confirmButton: \"confirmButton\",\r\n            },\r\n          });\r\n          setTimeout(() => {\r\n            location.reload();\r\n          }, 2000);\r\n        }\r\n      } else {\r\n        Swal.fire({\r\n          text: `${result.mensaje}`,\r\n          icon: \"error\",\r\n          customClass: {\r\n            popup: \"popup\",\r\n            confirmButton: \"confirmButton\",\r\n          },\r\n        });\r\n      }\r\n    } catch (error) {\r\n      Swal.fire({\r\n        text: `${error}`,\r\n        icon: \"error\",\r\n        customClass: {\r\n          popup: \"popup\",\r\n          confirmButton: \"confirmButton\",\r\n        },\r\n      });\r\n    }\r\n  });\r\n});\r\n\r\nbtnActivar.forEach((boton) => {\r\n  boton.addEventListener(\"click\", async () => {\r\n    try {\r\n      const idProducto = boton.id;\r\n      const response = await fetch(`/abm/${idProducto}`);\r\n      const result = response.json();\r\n      if (response.ok) {\r\n        const result = await reactivarProducto(idProducto);\r\n        if (result.status === 200) {\r\n          Swal.fire({\r\n            text: `${result.mensaje}`,\r\n            icon: \"success\",\r\n            customClass: {\r\n              popup: \"popup\",\r\n              confirmButton: \"confirmButton\",\r\n            },\r\n          });\r\n          setTimeout(() => {\r\n            location.reload();\r\n          }, 2000);\r\n        }\r\n      } else {\r\n        Swal.fire({\r\n          text: `${result.mensaje}`,\r\n          icon: \"error\",\r\n          customClass: {\r\n            popup: \"popup\",\r\n            confirmButton: \"confirmButton\",\r\n          },\r\n        });\r\n      }\r\n    } catch (error) {\r\n      Swal.fire({\r\n        text: `${error}`,\r\n        icon: \"error\",\r\n        customClass: {\r\n          popup: \"popup\",\r\n          confirmButton: \"confirmButton\",\r\n        },\r\n      });\r\n    }\r\n  });\r\n});\r\n\r\nasync function insertarDatos(formData) {\r\n  try {\r\n    const pedido = await fetch(\"/abm\", {\r\n      method: \"POST\",\r\n      body: formData,\r\n    });\r\n    return pedido.json();\r\n  } catch (error) {\r\n    Swal.fire({\r\n      text: `${error}`,\r\n      icon: \"error\",\r\n      customClass: {\r\n        popup: \"popup\",\r\n        confirmButton: \"confirmButton\",\r\n      },\r\n    });\r\n  }\r\n}\r\n\r\nasync function editarProducto(formData, idProducto) {\r\n  try {\r\n    const pedido = await fetch(`/abm/${idProducto}`, {\r\n      method: \"PUT\",\r\n      body: formData,\r\n    });\r\n    return pedido.json();\r\n  } catch (error) {\r\n    Swal.fire({\r\n      text: `${error}`,\r\n      icon: \"error\",\r\n      customClass: {\r\n        popup: \"popup\",\r\n        confirmButton: \"confirmButton\",\r\n      },\r\n    });\r\n  }\r\n}\r\n\r\nasync function eliminarProducto(idProducto) {\r\n  try {\r\n    const pedido = await fetch(`/abm/${idProducto}`, {\r\n      method: \"DELETE\",\r\n    });\r\n    return await pedido.json();\r\n  } catch (error) {\r\n    Swal.fire({\r\n      text: `${error}`,\r\n      icon: \"error\",\r\n      customClass: {\r\n        popup: \"popup\",\r\n        confirmButton: \"confirmButton\",\r\n      },\r\n    });\r\n  }\r\n}\r\n\r\nasync function reactivarProducto(idProducto) {\r\n  try {\r\n    const pedido = await fetch(`/abm/${idProducto}`, {\r\n      method: \"PATCH\",\r\n    });\r\n    return await pedido.json();\r\n  } catch (error) {\r\n    Swal.fire({\r\n      text: `${error}`,\r\n      icon: \"error\",\r\n      customClass: {\r\n        popup: \"popup\",\r\n        confirmButton: \"confirmButton\",\r\n      },\r\n    });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://tp-programacion-iii-espindola-grimaldi-2024-c2/./public/js/abm.js?");

/***/ }),

/***/ "./public/js/pantalla-productos.js":
/*!*****************************************!*\
  !*** ./public/js/pantalla-productos.js ***!
  \*****************************************/
/***/ (() => {

eval("throw new Error(\"Module parse failed: Duplicate export 'default' (23:7)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n| \\n| //funcion que obtiene el tema del local storage guardado antes y setea el tema de la pagina.\\n> export default function temaLocalStorage() {\\n|   let tema = localStorage.getItem(\\\"theme\\\");\\n|   switch (tema) {\");\n\n//# sourceURL=webpack://tp-programacion-iii-espindola-grimaldi-2024-c2/./public/js/pantalla-productos.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./public/js/abm.js");
/******/ 	
/******/ })()
;