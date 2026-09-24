import { getVentas } from './conexion_ventas.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await getVentas();
        console.log('Datos recibidos:', data); 

        
        if (!Array.isArray(data)) {
            throw new Error('Datos recibidos no están en el formato esperado.');
        }

        
        function formatearFecha(fecha) {
            const date = new Date(fecha);
            const dia = String(date.getDate()).padStart(2, '0');
            const mes = String(date.getMonth() + 1).padStart(2, '0'); 
            const año = date.getFullYear();
            return `${dia}/${mes}/${año}`;
        }

        
        const tableBody = document.querySelector('.styled-table-ventas tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Id_venta}</td>
                <td>${item.Ventas_actuales}</td>
                <td>${item.Ventas_estimadas}</td>
                <td>${item.porcentaje_Progreso_Mes}</td>
                <td>${item.Mes_Anio}</td>
                <td>${formatearFecha(item.fecha_Actualizacion)}</td>
            `;
            tableBody.appendChild(row);
        });

        const labels = data.map(item => item.Mes_Anio);
        const ventasActuales = data.map(item => parseFloat(item.Ventas_actuales));
        const ventasEstimadas = data.map(item => parseFloat(item.Ventas_estimadas));

        const ctx = document.getElementById('ventasActEstChart').getContext('2d');
        if (!ctx) {
            console.error('No se pudo obtener el contexto del canvas');
            return;
        }

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ventas Estimadas',
                        data: ventasEstimadas,
                        borderColor: '#FF5733',
                        backgroundColor: 'rgba(255, 87, 51, 0.2)',
                        borderWidth: 2,
                        tension: 0.1
                    },
                    {
                        label: 'Ventas Actuales',
                        data: ventasActuales,
                        borderColor: '#28B463',
                        backgroundColor: 'rgba(40, 180, 99, 0.2)',
                        borderWidth: 2,
                        tension: 0.1
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
});