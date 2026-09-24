document.addEventListener("DOMContentLoaded", function() {
    const returnButton = document.querySelector(".boton-regreso");

    returnButton.addEventListener("click", function() {
        window.location.href = "/Empleados.html"; // Redirige al usuario a la interfaz principal
    });
});