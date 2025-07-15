document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("formLogin").addEventListener("submit", function (e) {
        e.preventDefault();

        const correo = document.getElementById("correo").value.trim();
        const password = document.getElementById("password").value.trim();

        fetch("http://localhost:8080/api/clientes/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ correo, password })
        })
            .then(response => {
                if (!response.ok) throw new Error("Credenciales inválidas");
                return response.json();
            })
            .then(cliente => {
                localStorage.setItem("cliente", JSON.stringify(cliente));
                alert("¡Bienvenido de nuevo, " + cliente.nombre + "!");
                window.location.href = "Productos.html";
            })
            .catch(error => {
                console.error("Login error:", error);
                alert("Correo o contraseña incorrectos.");
            });
    });
});