document.addEventListener("DOMContentLoaded", function() {
    const labels = datosSegmentacion.map(item => item.segmento);
    const valores = datosSegmentacion.map(item => item.porcentaje);
    
    const ctx = document.getElementById("segmentacionChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A"],
            }]
        },
        options: {
            responsive: true
        }
    });

    const reporteContainer = document.getElementById("reporte");
    datosSegmentacion.forEach(segmento => {
        const card = document.createElement("div");
        card.classList.add("reporte-card-segmento");
        card.innerHTML = `
            <h3>${segmento.segmento}</h3>
            <p><strong>${segmento.porcentaje}%</strong> de los clientes</p>
            <p>${segmento.descripcion}</p>
        `;
        reporteContainer.appendChild(card);
    });
});