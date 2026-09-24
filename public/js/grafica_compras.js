import { getTendencias } from './conexion_tendencias.js';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await getTendencias();
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

        
        const tableBody = document.querySelector('.styled-table-tendencias tbody');
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Id_tendencia}</td>
                <td>${formatearFecha(item.fecha_Tendencia)}</td>
                <td>${item.tipo_Tendencia}</td>
                <td>${item.ventas_Generadas}</td>
                <td>${item.porcentaje_Clientes}</td>
                <td>${item.porcentaje_Cambio}</td>
                <td>${item.valor_promedio_Transaccion}</td>
            `;
            tableBody.appendChild(row);
        });

        const labels = data.map(item => item.tipo_Tendencia);
        const ventasGeneradas = data.map(item => parseFloat(item.ventas_Generadas));
        const valorPromedio = data.map(item => parseFloat(item.porcentaje_Cambio));

        const ctx = document.getElementById('ventasGeneradasChart').getContext('2d');
        if (!ctx) {
            console.error('No se pudo obtener el contexto del canvas');
            return;
        }

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Ventas Generadas',
                        data: ventasGeneradas,
                        backgroundColor: '#4CAF50',
                        borderColor: '#388E3C',
                        borderWidth: 1
                    },
                    {
                        label: 'Porcentaje de cambio',
                        data: valorPromedio,
                        backgroundColor: '#FF9800',
                        borderColor: '#F57C00',
                        borderWidth: 1
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
