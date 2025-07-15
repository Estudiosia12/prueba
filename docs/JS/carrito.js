
let carrito = [];

function agregarAlCarrito(id, nombre, inputId, precio) {
    const cantidad = parseInt(document.getElementById(inputId).value);
    if (!cantidad || cantidad <= 0) {
        alert("Ingrese una cantidad válida");
        return;
    }

    const existente = carrito.find(p => p.id === id);
    if (existente) {
        existente.cantidad += cantidad;
    } else {
        carrito.push({ id, nombre, cantidad, precio });
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(p => p.id !== id);
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
}

function actualizarCarrito() {
    const contenedor = document.getElementById("carrito-items");
    if (!contenedor) return;

    contenedor.innerHTML = '';

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>No hay productos en el carrito</p>";
        return;
    }

    carrito.forEach(item => {
        const div = document.createElement("div");
        div.textContent = `${item.nombre} x ${item.cantidad}`;

        const btn = document.createElement("button");
        btn.className = "eliminar-btn";
        btn.textContent = "✖";
        btn.onclick = () => eliminarDelCarrito(item.id);

        div.appendChild(btn);
        contenedor.appendChild(div);
    });
}

function cargarResumenCompra() {
    const productos = JSON.parse(localStorage.getItem("carrito")) || [];
    let subtotal = 0;
    const tabla = document.getElementById("tabla-pedido");

    if (tabla) tabla.innerHTML = "";

    productos.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `<td>${p.nombre}</td><td>S/ ${(p.cantidad * p.precio).toFixed(2)}</td>`;
        tabla.appendChild(fila);
        subtotal += p.cantidad * p.precio;
    });

    const sub = document.getElementById("subtotal");
    const total = document.getElementById("total");
    if (sub) sub.textContent = `S/ ${subtotal.toFixed(2)}`;
    if (total) total.textContent = `S/ ${(subtotal + 9).toFixed(2)}`;
}

function confirmarPedido() {
    alert("Gracias por su compra 😊");
    localStorage.clear();
    window.location.href = "index.html";
}

function cancelarPedido() {
    localStorage.clear();
    window.location.href = "Productos.html";
}

window.onload = function () {
    const guardado = JSON.parse(localStorage.getItem("carrito"));
    if (guardado) {
        carrito = guardado;
    }
    actualizarCarrito();
    cargarResumenCompra();
};
    function verificarUsuario() {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    if (cliente && cliente.id) {
    // Si ya hay cliente logueado, ir directo a pagar
    window.location.href = "DetalleCompra.html";
} else {
    // Si no, mostrar modal
    document.getElementById("modalUsuario").style.display = "block";
}
}

    function cerrarModal() {
    document.getElementById("modalUsuario").style.display = "none";
}
