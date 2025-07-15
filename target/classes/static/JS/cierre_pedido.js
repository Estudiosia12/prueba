window.onload = function () {
  cargarResumenCompra();

  const opcionesEnvio = document.getElementsByName("envio");
  opcionesEnvio.forEach(opcion => {
    opcion.addEventListener("change", cargarResumenCompra);
  });
};

// 🧾 Carga productos y actualiza el total
function cargarResumenCompra() {
  const productos = JSON.parse(localStorage.getItem("carrito")) || [];
  const tabla = document.getElementById("tabla-pedido");
  const subtotalElem = document.getElementById("subtotal");
  const totalElem = document.getElementById("total");

  if (!tabla || !subtotalElem || !totalElem) return;

  tabla.innerHTML = "";

  let subtotal = 0;

  productos.forEach(p => {
    const fila = document.createElement("tr");
    const totalProducto = p.cantidad * p.precio;
    fila.innerHTML = `
      <td>${p.nombre} (${p.cantidad} x S/ ${p.precio.toFixed(2)})</td>
      <td>S/ ${totalProducto.toFixed(2)}</td>
    `;
    subtotal += totalProducto;
    tabla.appendChild(fila);
  });

  let costoEnvio = document.getElementById("delivery")?.checked ? 9.00 : 0;
  subtotalElem.textContent = `S/ ${subtotal.toFixed(2)}`;
  totalElem.textContent = `S/ ${(subtotal + costoEnvio).toFixed(2)}`;
}

// ✅ Confirmar pedido y enviar a backend
function confirmarPedido() {
  // Capturar datos del cliente desde los inputs
  const nombre = document.getElementById("nombre")?.value.trim();
  const apellidos = document.getElementById("apellidos")?.value.trim();
  const direccion = document.getElementById("direccion")?.value.trim();
  const telefono = document.getElementById("telefono")?.value.trim();
  const correo = document.getElementById("correo")?.value.trim();
  const notas = document.getElementById("notas")?.value.trim();
  const tipoEnvio = document.querySelector('input[name="envio"]:checked')?.value;

  // Validaciones básicas
  if (!nombre || !apellidos || !direccion || !telefono || !correo) {
    alert("Por favor, complete todos los campos obligatorios.");
    return;
  }

  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carrito.length === 0) {
    alert("Tu carrito está vacío.");
    return;
  }

  const subtotal = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  const costoEnvio = tipoEnvio === "delivery" ? 9.00 : 0;
  const totalCalculado = subtotal + costoEnvio;

  // Objeto Cliente
  const cliente = JSON.parse(localStorage.getItem("cliente"));

  if (!cliente) {
    alert("Debes iniciar sesión para continuar.");
    window.location.href = "login.html";
    return;
  }

  // Objeto Pedido
  const pedido = {
    total: totalCalculado,
    envio: tipoEnvio,
    notas,
    cliente,
    detalles: carrito.map(p => ({
      producto: { id: p.id },
      cantidad: p.cantidad,
      subtotal: p.precio * p.cantidad
    }))
  };

  // Debug
  console.log("Pedido JSON:", JSON.stringify(pedido, null, 2));

  // Enviar al backend
  fetch("http://localhost:8080/api/pedidos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido)
  })
      .then(response => {
        if (!response.ok) throw new Error("Error al registrar el pedido");
        return response.json();
      })
      .then(data => {
        alert("¡Gracias por su compra! 🎉");
        localStorage.removeItem("carrito");
        window.location.href = "index.html";
      })
      .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al realizar el pedido.");
      });
}

// 🧹 Botón para cancelar pedido
function cancelarPedido() {
  localStorage.removeItem("carrito");
  window.location.href = "Productos.html";
}
window.addEventListener("DOMContentLoaded", () => {
  const clienteGuardado = JSON.parse(localStorage.getItem("cliente"));

  if (clienteGuardado) {
    document.getElementById("nombre").value = clienteGuardado.nombre || "";
    document.getElementById("apellidos").value = clienteGuardado.apellidos || "";
    document.getElementById("direccion").value = clienteGuardado.direccion || "";
    document.getElementById("telefono").value = clienteGuardado.telefono || "";
    document.getElementById("correo").value = clienteGuardado.correo || "";
  }
});