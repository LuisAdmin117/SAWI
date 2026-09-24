export async function obtenerSegmentacion() {
    try {
        const respuesta = await fetch("http://localhost/AprediendoPHP/Obtener_segmentacion.php");
        if (!respuesta.ok) {
            throw new Error("Error al obtener los datos de segmentación.");
        }
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error(error);
        return [];
    }
}
