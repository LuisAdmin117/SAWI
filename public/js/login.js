
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const email = document.getElementById('email').value.trim();
    const contrasena = document.getElementById('contrasena').value.trim();

    try {
        
        const response = await fetch('http://localhost:5500/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'applications/json',
            },
            body: JSON.stringify({
                nombre,
                contrasena: contrasena,
            }),
        });

        
        if (response.ok){
            const userData = await response.json();
            
            localStorage.setItem('userData', JSON.stringify(userData));
            window.location.href = 'Gerentes.html'; 
        } else {
            const errorMessage = await response.text();
            document.getElementById('responseMessage').innerText = errorMessage;
        }
    } catch (error) {
        console.error('Error al iniciar sesión:', error);
        document.getElementById('responseMessage').innerText = 'Error al inciar sesión. Intente de nuevo.'
    }
});