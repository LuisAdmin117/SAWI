document.addEventListener("DOMContentLoaded", () => {
    const btnFiltro = document.getElementById("btnFiltro");
    const modal = document.getElementById("filtroModal");
    const cerrar = document.querySelector(".cerrar");
    const aplicarFiltro = document.getElementById("aplicarFiltro");

    // Mostrar la ventana de filtro
    btnFiltro.addEventListener("click", () => {
        modal.style.display = "block";
    });

    // Cerrar la ventana de filtro
    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // Aplicar filtro
    aplicarFiltro.addEventListener("click", () => {
        const filtroNombre = document.getElementById("nombreProducto").value.toLowerCase().trim();
        const filtroCategoria = document.getElementById("categoria").value.toLowerCase().trim();

        document.querySelectorAll(".tarjeta-producto").forEach(producto => {
            const nombre = producto.getAttribute("data-nombre").toLowerCase();
            const categoria = producto.getAttribute("data-categoria").toLowerCase();

            if ((!filtroNombre || nombre.includes(filtroNombre)) && 
                (!filtroCategoria || categoria.includes(filtroCategoria))) {
                producto.classList.remove("oculto");
            } else {
                producto.classList.add("oculto");
            }
        });

        modal.style.display = "none";
    });
});
