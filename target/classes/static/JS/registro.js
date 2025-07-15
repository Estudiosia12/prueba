document.getElementById("formRegistro").addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellidos = document.getElementById("apellidos").value.trim();
    const direccion = document.getElementById("direccion").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const correo = document.getElementById("correo").value.trim();
    const password = document.getElementById("clave").value.trim(); // Aquí lo corregí a password

    if (!nombre || !apellidos || !direccion || !telefono || !correo || !password) {  // Usé password en vez de clave
        alert("Todos los campos son obligatorios.");
        return;
    }

    const cliente = {
        nombre,
        apellidos,
        direccion,
        telefono,
        correo,
        password  // Asegúrate de que aquí sea password
    };

    fetch("http://localhost:8080/api/clientes/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cliente)
    })
        .then(response => {
            if (!response.ok) throw new Error("Error en el registro");
            return response.json();
        })
        .then(data => {
            alert("Registro exitoso. Ahora puedes iniciar sesión.");
            window.location.href = "login.html";
        })
        .catch(error => {
            console.error("Error:", error);
            alert("No se pudo completar el registro.");
        });
});