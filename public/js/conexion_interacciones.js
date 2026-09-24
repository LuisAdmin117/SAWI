document.addEventListener("DOMContentLoaded", () => {
    const contenedorInteracciones = document.querySelector(".contenedor-interacciones");

    const formatearFechaHora = (fechaHora) => {
        const fecha = new Date(fechaHora);
        const opciones = {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        };
        return fecha.toLocaleString("es-MX", opciones).replace(",", "");
    };

    const cargarInteracciones = async () => {
        try {
            const response = await fetch("http://localhost/AprediendoPHP/Obtener_interacciones.php");
            const interacciones = await response.json();

            interacciones.forEach(interaccion => {
                const tarjeta = document.createElement("div");
                tarjeta.classList.add("tarjeta");

                const fechaHoraFormateada = formatearFechaHora(interaccion.fecha_Hora);

                tarjeta.innerHTML = `
                    
                    <div class="info">
                        <h2>ID Cliente: ${interaccion.ID_cliente}</h2>
                        <p><strong>Folio Satisfacción:</strong> ${interaccion.Folio_satisfaccion}</p>
                        <p><strong>Fecha y Hora:</strong> ${fechaHoraFormateada}</p>
                        <p><strong>Tipo de Interacción:</strong> ${interaccion.tipo_Interaccion}</p>
                        <p><strong>Duración:</strong> ${interaccion.Duracion} min</p>
                        <p class="resultado ${interaccion.Resultado.toLowerCase().includes('exitosa') ? 'exitosa' : 'no-exitosa'}">
                            ${interaccion.Resultado.includes('Exitosa') ? '✔ Exitosa' : '✖ No Exitosa'}
                        </p>
                    </div>
                `;
                contenedorInteracciones.appendChild(tarjeta);
            });
        } catch (error) {
            console.error("Error al cargar interacciones:", error);
        }
    };

    cargarInteracciones();
});
