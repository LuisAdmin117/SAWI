document.getElementById("formulario-producto").addEventListener("submit", function(event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    fetch("http://localhost/AprediendoPHP/Guardar_producto.php", {
        method: "POST",
        body: formData,
    })
    .then(response => response.text()) 
    .then(data => {
        console.log(data); 
        window.location.href = "/Empleados.html"; 
    })
    .catch(error => {
        console.error("Error:", error);
        alert("Hubo un problema al registrar el producto.");
    });
});