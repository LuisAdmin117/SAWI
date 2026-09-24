// script.js
window.onload = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const tipo = urlParams.get('tipo'); 

    document.getElementById('tipoUsuario').value = tipo;
};