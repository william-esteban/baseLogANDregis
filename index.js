const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database');
const router = require('./routes');
const auth = require('./middleware/auth');

const app = express();
const port = 3000;

// conecta a la database con mongodb.

connectDB();

// Analiza las solicitudes entrantes con el tipo de contenido application/json.
app.use(bodyParser.json());

// Analiza las solicitudes entrantes con el tipo de contenido application/x-www-form-urlencoded.
// Cuando extended está establecido en false, bodyParser utiliza la función querystring de Node.js para analizar los cuerpos de las solicitudes entrantes. 
// Cuando extended está establecido en true, utiliza la biblioteca qs para analizar los cuerpos de las solicitudes entrantes, lo que permite analizar objetos anidados y matrices. 

app.use(bodyParser.urlencoded({ extended: false}));

app.use(auth.initialize());

// configura las rutas.
app.use('/', router);

app.listen(port, () => console.log(`listening at http://localhost:${port}`));
