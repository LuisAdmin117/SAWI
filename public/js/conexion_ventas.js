async function obtenerDatos() {
    const response = await fetch('http://localhost/AprediendoPHP/Obtener_ventas.php');
    if (!response.ok) {
        throw new Error('Error al obtener los datos');
    }
    return await response.json();
}

export async function getVentas() {
    return await obtenerDatos();
}
