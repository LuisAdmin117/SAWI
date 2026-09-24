const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(express.static('paginas'));

const dbConfig = {
    host: 'localhost',
    database: 'BaseDeDatosSAWI',
    user: 'root',
    password: '',
    port: 3306
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conectado a la base de datos MySQL');
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formregistro.html');
});

app.post('/register', (req, res) => {
    const { nombre, nomEmp, email, telefono, contrasena } = req.body;

    const query = 'INSERT INTO Gerentes (Nombre, Empresa_Negocio, Correo_electronico, Telefono, Contrasena) VALUES (?, ?, ?, ?, ?)';

    connection.query(query, [nombre, nomEmp, email, telefono, contrasena], (err, result) => {
        if (err) {
            console.error('Error al registrar el usuario:', err);
            res.send('Error al registrar el usuario');
            return;
        }
        res.redirect('/index.html');
    });
});

app.get('/index.html', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/login', (req, res) => {
    const { email, contrasena, tipo } = req.body; 

    if (!email || !contrasena || !tipo) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const table = tipo === 'gerente' ? 'Gerentes' : 'Empleados';

    const sql = `SELECT * FROM ${table} WHERE Correo_electronico = ? AND Contrasena = ?`;
    connection.query(sql, [email, contrasena], (err, result) => {
        if (err) {
            console.error('Error en la base de datos', err);
            return res.status(500).send('Error del servidor');
        }

        if (result.length === 0) {
            return res.status(404).send('Usuario no encontrado o contraseña incorrecta');
        }

        if (tipo === 'gerente') {
            res.redirect('/Gerentes.html');
        } else {
            res.redirect('/Empleados.html');
        }
    });
});

app.get('/Gerentes.html', (req, res) => {
    res.sendFile(__dirname + '/Gerentes.html');
});

const port = 5500;
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});