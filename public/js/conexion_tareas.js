document.addEventListener('DOMContentLoaded', () => {
    fetch('http://localhost/AprediendoPHP/Obtener_tareas.php')
        .then(response => response.json())
        .then(data => {
            const contenedor = document.querySelector('.linea-tiempo');
            
            data.forEach(tarea => {
                
                console.log('Objeto tarea:', tarea);

                const tareaDiv = document.createElement('div');
                tareaDiv.classList.add('tarea');

                tareaDiv.innerHTML = `
                    <div class="contenido">
                        <h2>${tarea.Actividad}</h2>
                        <p><strong>Estado:</strong> ${tarea.Estado}</p>
                        <p><strong>Empleado:</strong> ${tarea.Numero_De_Empleado || 'No asignado'}</p>
                        <div class="progreso">
                            <div class="barra" style="width: ${tarea.porcentaje_Avanzado || 0}%;"></div>
                        </div>
                        <p class="porcentaje"><strong>Porcentaje:</strong> ${tarea.porcentaje_Avanzado || 0}%</p>
                    </div>
                `;

                if (!tarea.Numero_De_Empleado) {
                    const botonTomarTarea = document.createElement('button'); // Botón dinámico
                    botonTomarTarea.classList.add('btn-tomar-tarea');
                    botonTomarTarea.textContent = 'Tomar tarea';

                    botonTomarTarea.addEventListener('click', () => {
                        const idActividad = tarea.Id_Actividad;

                        console.log(`ID Actividad enviado: ${idActividad}`);

                        fetch('http://localhost/AprediendoPHP/Actualizar_tarea.php', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded',
                            },
                            body: `id_actividad=${idActividad}`
                        })
                        .then(response => response.text())
                        .then(responseText => {
                            alert(responseText); 
                            location.reload(); 
                        })
                        .catch(error => console.error('Error:', error));
                    });

                    tareaDiv.querySelector('.contenido').appendChild(botonTomarTarea);
                }

                contenedor.appendChild(tareaDiv);
            });
        })
        .catch(error => console.error('Error:', error));
});