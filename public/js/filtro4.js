document.addEventListener("DOMContentLoaded", () => {
    const btnFiltro = document.getElementById("btnFiltro");
    const modal = document.getElementById("filtroModal");
    const cerrar = document.querySelector(".cerrar");
    const aplicarFiltro = document.getElementById("aplicarFiltro");

    btnFiltro.addEventListener("click", () => {
        modal.style.display = "block";
    });

    cerrar.addEventListener("click", () => {
        modal.style.display = "none";
    });

    aplicarFiltro.addEventListener("click", () => {
        const filtroEmpleado = document.getElementById("empleado").value.trim();
        
        document.querySelectorAll(".reporte-empleado").forEach(reporte => {
            const empleado = reporte.getAttribute("data-empleado");
            

            if ((!filtroEmpleado || empleado.includes(filtroEmpleado))) {
                reporte.classList.remove("oculto2");
            } else {
                reporte.classList.add("oculto2");
            }
        });

        modal.style.display = "none";
    });
});