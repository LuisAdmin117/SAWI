function formatearFechaHora(fechaHora) {
    const fechaObjeto = new Date(fechaHora);
    
    const dia = String(fechaObjeto.getDate()).padStart(2, '0');
    const mes = String(fechaObjeto.getMonth() + 1).padStart(2, '0'); 
    const año = fechaObjeto.getFullYear();
    
    const horas = String(fechaObjeto.getHours()).padStart(2, '0');
    const minutos = String(fechaObjeto.getMinutes()).padStart(2, '0');
    
    return `${dia}/${mes}/${año} ${horas}:${minutos}`;
}

fetch('http://localhost/AprediendoPHP/Obtener_productos.php')
    .then(response => response.json())
    .then(data => {
        const contenedor = document.querySelector('.tarjetas-contenedor');

        data.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';
            tarjeta.setAttribute('data-nombre', producto.Nombre);
            tarjeta.setAttribute('data-categoria', producto.Categoria);

            const fechaReposicionFormateada = producto.Fecha_Reposicion
                ? formatearFechaHora(producto.Fecha_Reposicion)
                : 'No definida';

            tarjeta.innerHTML = `
                <img src="img/${producto.Nombre.replace(/\s+/g, '-').toLowerCase()}.jpg" alt="${producto.Nombre}">
                <div class="info-producto">
                    <h2>${producto.Nombre}</h2>
                    <p><strong>Categoría:</strong> ${producto.Categoria}</p>
                    <p><strong>Cantidad Actual:</strong> ${producto.Cantidad_Actual}</p>
                    <p><strong>Cantidad Promocional:</strong> ${producto.Cantidad_Promocional}</p>
                    <p><strong>Cantidad Vencida:</strong> ${producto.Cantidad_Vencida}</p>
                    <p><strong>Precio:</strong> $${producto.Precio}</p>
                    <p><strong>Proveedor:</strong> ${producto.Proveedor || 'No especificado'}</p>
                    <p><strong>Fecha de Reposición:</strong> ${fechaReposicionFormateada}</p>
                    <p><strong>Mermas:</strong> ${producto.Mermas || 'No disponible'}</p>
                    <p><strong>Devoluciones:</strong> ${producto.Devoluciones || 'No disponible'}</p>
                    <p><strong>Descuento Aplicado:</strong> ${producto.Descuento_Aplicado || 0}%</p>
                </div>
            `;

            contenedor.appendChild(tarjeta);
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));