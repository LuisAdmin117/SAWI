document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost/AprediendoPHP/Obtener_rendimiento.php")
        .then(response => response.json())
        .then(datos => {
            const contenedor = document.querySelector(".contenedor-reporte");

            datos.forEach(empleado => {
                const empleadoHTML = `
                <div class="reporte-empleado" data-empleado="${empleado.Numero_De_Empleado}">
                    <div class="tarjeta-empleado">
                        <img src="empleado${empleado.Numero_De_Empleado}.jpg" alt="Empleado ${empleado.Numero_De_Empleado}">
                        <div class="info-empleado">
                            <h2>Empleado ${empleado.Numero_De_Empleado}</h2>
                            <p><strong>Actividad:</strong> ${empleado.actividad_Laborada}</p>
                            <p><strong>Horas Laboradas:</strong> ${empleado.horas_Laboradas}</p>
                            <p><strong>Descripción:</strong> ${empleado.Descripcion}</p>
                            <p><strong>Porcentaje de Avance:</strong> ${empleado.Porcentaje_Avance}%</p>
                        </div>
                    </div>
                    <hr class="separador">
                </div>`;
                
                contenedor.insertAdjacentHTML("beforeend", empleadoHTML);
            });
        })
        .catch(error => console.error("Error al obtener los datos: ", error));
});
