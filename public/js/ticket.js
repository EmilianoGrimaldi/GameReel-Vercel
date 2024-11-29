let btnVenta = document.querySelector(".venta");
let idVenta = btnVenta.id;

btnVenta.addEventListener("click", function () {
  setTimeout(() => {
    window.location.href = `/ticket/pdf/${idVenta}`;
  }, 500);

  setTimeout(() => {
    Swal.fire({
      text: "Comprobante descargado!",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  }, 1500);
});
