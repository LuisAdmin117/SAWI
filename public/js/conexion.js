// Obtener datos de la API PHP
fetch('http://localhost/AprediendoPHP/Obtener_productos.php')
    .then(response => response.json())
    .then(data => {
        const contenedor = document.querySelector('.tarjetas-contenedor');

        // En lugar de limpiar el contenido anterior, agregamos los datos dinámicos
        data.forEach(producto => {
            const tarjeta = document.createElement('div');
            tarjeta.className = 'tarjeta-producto';
            tarjeta.setAttribute('data-nombre', producto.Nombre);
            tarjeta.setAttribute('data-categoria', producto.Categoria);

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
                    <p><strong>Fecha de Reposición:</strong> ${producto.Fecha_Reposicion || 'No definida'}</p>
                    <p><strong>Mermas:</strong> ${producto.Mermas || 'No disponible'}</p>
                    <p><strong>Devoluciones:</strong> ${producto.Devoluciones || 'No disponible'}</p>
                    <p><strong>Descuento Aplicado:</strong> ${producto.Descuento_Aplicado || 0}%</p>
                </div>
            `;

            contenedor.appendChild(tarjeta); // Agregamos las nuevas tarjetas sin eliminar las anteriores
        });
    })
    .catch(error => console.error('Error al obtener datos:', error));