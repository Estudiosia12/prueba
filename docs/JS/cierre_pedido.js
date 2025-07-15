/*  cierre_pedido.js  */

/* Al cargar la página ---------------------------------------------- */
window.onload = () => {
  cargarResumenCompra();

  // refrescar totales al cambiar tipo de envío
  document.getElementsByName("envio").forEach(op =>
    op.addEventListener("change", cargarResumenCompra)
  );

  // si hay datos de cliente guardados, precargar el formulario
  const clienteGuardado = JSON.parse(localStorage.getItem("cliente"));
  if (clienteGuardado) {
    document.getElementById("nombre").value     = clienteGuardado.nombre     || "";
    document.getElementById("apellidos").value  = clienteGuardado.apellidos  || "";
    document.getElementById("direccion").value  = clienteGuardado.direccion  || "";
    document.getElementById("telefono").value   = clienteGuardado.telefono   || "";
    document.getElementById("correo").value     = clienteGuardado.correo     || "";
  }
};

/* ------------------------------------------------------------------ */
/* 🧾  Cargar y mostrar resumen del carrito                            */
function cargarResumenCompra() {
  const productos      = JSON.parse(localStorage.getItem("carrito")) || [];
  const tabla          = document.getElementById("tabla-pedido");
  const subtotalElem   = document.getElementById("subtotal");
  const totalElem      = document.getElementById("total");
  if (!tabla || !subtotalElem || !totalElem) return;

  tabla.innerHTML = "";
  let subtotal = 0;

  productos.forEach(p => {
    const totalProd = p.cantidad * p.precio;
    subtotal += totalProd;

    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${p.nombre} (${p.cantidad} x S/ ${p.precio.toFixed(2)})</td>
      <td>S/ ${totalProd.toFixed(2)}</td>`;
    tabla.appendChild(fila);
  });

  const costoEnvio   = document.getElementById("delivery")?.checked ? 9 : 0;
  subtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
  totalElem.textContent    = `S/ ${(subtotal + costoEnvio).toFixed(2)}`;
}

/* ------------------------------------------------------------------ */
/* ✅  Confirmar pedido y enviarlo al backend                          */
function confirmarPedido(e) {
  e.preventDefault();

  /* Datos del formulario ---------- */
  const nombre     = document.getElementById("nombre").value.trim();
  const apellidos  = document.getElementById("apellidos").value.trim();
  const direccion  = document.getElementById("direccion").value.trim();
  const telefono   = document.getElementById("telefono").value.trim();
  const correo     = document.getElementById("correo").value.trim();
  const notas      = document.getElementById("notas").value.trim();
  const tipoEnvio  = document.querySelector('input[name="envio"]:checked')?.value;

  /* Validaciones básicas ---------- */
  if (!nombre || !apellidos || !direccion || !telefono || !correo) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  /* Totales ---------- */
  const subtotal    = carrito.reduce((s, p) => s + p.precio * p.cantidad, 0);
  const costoEnvio  = tipoEnvio === "delivery" ? 9 : 0;
  const total       = subtotal + costoEnvio;

  /* Cliente ----------
     - si existe en localStorage (sesión iniciada) se usa
     - si no, se crea uno “invitado” con los datos del formulario         */
  let cliente = JSON.parse(localStorage.getItem("cliente"));
  if (!cliente) {
    cliente = { nombre, apellidos, direccion, telefono, correo };
  }

  /* Pedido completo --------------- */
  const pedido = {
    total,
    envio: tipoEnvio,
    notas,
    cliente,
    detalles: carrito.map(p => ({
      producto: { id: p.id },
      cantidad: p.cantidad,
      subtotal: p.precio * p.cantidad
    }))
  };

  console.log("Pedido JSON:", JSON.stringify(pedido, null, 2));

  /* Enviar al backend ------------- */
  fetch("http://localhost:8080/api/pedidos", {
    method : "POST",
    headers: { "Content-Type": "application/json" },
    body   : JSON.stringify(pedido)
  })
    .then(r => {
      if (!r.ok) throw new Error("Error al registrar el pedido");
      return r.json();
    })
    .then(() => {
      alert("¡Gracias por su compra! 🎉");
      localStorage.removeItem("carrito");  // limpiar carrito
      window.location.href = "index.html";
    })
    .catch(err => {
      console.error("Error:", err);
      alert("Hubo un problema al realizar el pedido.");
    });
}

/* ------------------------------------------------------------------ */
/* 🧹  Cancelar pedido                                                 */
function cancelarPedido() {
  localStorage.removeItem("carrito");
  window.location.href = "Productos.html";
}
