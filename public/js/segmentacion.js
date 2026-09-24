document.addEventListener("DOMContentLoaded", function() {
    // Datos de segmentación
    const datosSegmentacion = [
        { 
            nombre: "Compradores Frecuentes", 
            descripcion: "Clientes que compran al menos una vez por semana", 
            puntuacion: 85.5, 
            valor_promedio_compra: "$250.75", 
            preferencias: "Snacks, Bebidas"
        },
        { 
            nombre: "Clientes Nuevos", 
            descripcion: "Clientes con menos de un mes de antigüedad", 
            puntuacion: 60.0, 
            valor_promedio_compra: "$75.25", 
            preferencias: "Productos de higiene"
        },
        { 
            nombre: "Compradores de Alta Gama", 
            descripcion: "Clientes que prefieren productos premium", 
            puntuacion: 90.3, 
            valor_promedio_compra: "$520.50", 
            preferencias: "Electrónica, Perfumería"
        },
        { 
            nombre: "Clientes Ocasionales", 
            descripcion: "Compran una vez cada 3 meses aproximadamente", 
            puntuacion: 45.0, 
            valor_promedio_compra: "$95.80", 
            preferencias: "Alimentos orgánicos"
        },
        { 
            nombre: "Clientes Promocionales", 
            descripcion: "Compran principalmente en promociones", 
            puntuacion: 65.5, 
            valor_promedio_compra: "$120.00", 
            preferencias: "Ofertas especiales, descuentos"
        }
    ];

    // Mostrar reporte de segmentación
    const reporteContainer = document.getElementById("reporte");
    datosSegmentacion.forEach(segmento => {
        const card = document.createElement("div");
        card.classList.add("reporte-card-segmento");
        card.innerHTML = `
            <h3>${segmento.nombre}</h3>
            <p><strong>Descripción:</strong> ${segmento.descripcion}</p>
            <p><strong>porcentaje:</strong> ${segmento.puntuacion}</p>
            <p><strong>Valor Promedio de Compra:</strong> ${segmento.valor_promedio_compra}</p>
            <p><strong>Preferencias:</strong> ${segmento.preferencias}</p>
        `;
        reporteContainer.appendChild(card);
    });

    // Extraer datos para la gráfica
    const labels = datosSegmentacion.map(item => item.nombre);
    const valores = datosSegmentacion.map(item => item.puntuacion);
    
    // Configurar la gráfica de pastel
    const ctx = document.getElementById("segmentacionChart").getContext("2d");
    new Chart(ctx, {
        type: "pie",
        data: {
            labels: labels,
            datasets: [{
                data: valores,
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#8BC34A", "#9C27B0"],
            }]
        },
        options: {
            responsive: true
        }
    });
});