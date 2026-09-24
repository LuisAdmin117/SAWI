document.addEventListener("DOMContentLoaded", async () => {
    const contenedorTarjetas = document.querySelector(".contenedor");

    const formatearFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        const opcionesFecha = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        };
        const opcionesHora = {
            hour: "2-digit",
            minute: "2-digit"
        };
        const fechaFormateada = fecha.toLocaleDateString("es-MX", opcionesFecha);
        const horaFormateada = fecha.toLocaleTimeString("es-MX", opcionesHora).replace(/:\d{2}$/, ""); // Eliminar los segundos
        return `${fechaFormateada} ${horaFormateada}`;
    };

    try {
        const response = await fetch("http://localhost/AprediendoPHP/Obtener_satisfaccion.php");
        const datos = await response.json();

        datos.forEach(cliente => {
            const tarjeta = document.createElement("div");
            tarjeta.classList.add("tarjeta");

            const fechaCompraFormateada = formatearFechaHora(cliente.fecha_Compra);
            const fechaRegistroFormateada = formatearFechaHora(cliente.fecha_Registro);

            let claseSatisfaccion = "";
            if (cliente.nivel_Satisfaccion && cliente.nivel_Satisfaccion.trim().toLowerCase() === "alta") {
                claseSatisfaccion = "exitosa";
            } else if (cliente.nivel_Satisfaccion && cliente.nivel_Satisfaccion.trim().toLowerCase() === "media") {
                claseSatisfaccion = "media";
            } else if (cliente.nivel_Satisfaccion && cliente.nivel_Satisfaccion.trim().toLowerCase() === "baja") {
                claseSatisfaccion = "no-exitosa";
            } else {
                claseSatisfaccion = "indefinida";
            }



            tarjeta.innerHTML = `
                
                <div class="info">
                    <h2>${cliente.Nombre}</h2>
                    <p><strong>Necesidades:</strong> ${cliente.Necesidades}</p>
                    <p><strong>Preferencias:</strong> ${cliente.Preferencias}</p>
                    <p><strong>Comportamiento:</strong> ${cliente.Comportamiento}</p>
                    <p><strong>Fecha de Compra:</strong> ${fechaCompraFormateada}</p>
                    <p><strong>Productos Adquiridos:</strong> ${cliente.productos_Adquiridos}</p>
                </div>
                <div class="info">
                    <h2>Folio: ${cliente.folio_Satisfaccion}</h2>
                    <p><strong>Satisfacción:</strong> 
                        <span class="resultado ${claseSatisfaccion}">
                            ${cliente.nivel_Satisfaccion || "No especificado"}
                        </span>
                    </p>
                    <p><strong>Queja:</strong> ${cliente.Queja}</p>
                    <p><strong>Descripción:</strong> ${cliente.Descripcion}</p>
                    <p><strong>Estado:</strong> ${cliente.estado_Solucion}</p>
                    <p><strong>Fecha Registro:</strong> ${fechaRegistroFormateada}</p>
                    <p><strong>Solución:</strong> ${cliente.Solucion}</p>
                </div>
            `;

            contenedorTarjetas.appendChild(tarjeta);
        });
    } catch (error) {
        console.error("Error al cargar los datos:", error);
    }
});