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
        const filtroFolio = document.getElementById("folio").value.trim();
        const filtroFecha = document.getElementById("fecha").value.trim();

        document.querySelectorAll(".tarjeta").forEach(cliente => {
            const folio = cliente.getAttribute("data-folio");
            const fecha = cliente.getAttribute("data-fecha");

            if ((!filtroFolio || folio.includes(filtroFolio)) && 
                (!filtroFecha || fecha.includes(filtroFecha))) {
                cliente.classList.remove("oculto2");
            } else {
                cliente.classList.add("oculto2");
            }
        });

        modal.style.display = "none";
    });
});