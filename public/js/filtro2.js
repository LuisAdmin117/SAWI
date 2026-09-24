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
        const filtroCliente = document.getElementById("idcliente").value.trim();
        const filtroFecha = document.getElementById("fecha").value.trim();

        document.querySelectorAll(".tarjeta").forEach(info => {
            const cliente = info.getAttribute("data-cliente");
            const fecha = info.getAttribute("data-fecha");

            if ((!filtroCliente || cliente.includes(filtroCliente)) && 
                (!filtroFecha || fecha.includes(filtroFecha))) {
                info.classList.remove("oculto2");
            } else {
                info.classList.add("oculto2");
            }
        });

        modal.style.display = "none";
    });
});
