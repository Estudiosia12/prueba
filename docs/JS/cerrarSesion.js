document.addEventListener("DOMContentLoaded", function () {
    const cliente = JSON.parse(localStorage.getItem("cliente"));
    const liCerrar = document.getElementById("liCerrarSesion");

    // Mostrar botón si hay sesión iniciada
    if (cliente && liCerrar) {
        liCerrar.style.display = "list-item";
    }

    // Evento para cerrar sesión
    const btnCerrar = document.getElementById("btnCerrarSesion");
    if (btnCerrar) {
        btnCerrar.addEventListener("click", function () {
            localStorage.removeItem("cliente");
            alert("Has cerrado sesión.");
            // Oculta el botón sin redirigir
            liCerrar.style.display = "none";
        });
    }
});