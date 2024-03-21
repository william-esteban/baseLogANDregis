const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwt_secret = '#####adasassdsojoOJO';


// El controlador es el encargado de manejar la logica de negocio y crear los metodos correspondientes para manejar las solicitudes (obtener, crear, actualizar, eliminar)


const userController = {

// obtener todos los usuarios. get

getAllUsers: async ( req, res) => {
    try {
        const users = await User.find();
        res.json(users);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

},

// consultar por id. get

getUserById: async (req, res) => {
    const { id } = req.params.id;
    try {
        const userId = await User.findById({ id: id});
        res.json(userId);

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

},

// buscar por el nombre. get

getUserByNmane: async (req, res) => {
    try {
        const { name } = req.params;
        const byname = await User.findOne({ name: name});
        res.json((byname));

    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

},

// crear un nuevo usuario. post

createUser: async (req, res) => {
    const userData = req.body;
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
         // El código de respuesta de estado de éxito creado HTTP 201 Created indica que la solicitud ha tenido éxito y ha llevado a la creación de un recurso.
         res.status(201).json(savedUser);
        
    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

},
// actualizar la base de datos. patch

updateUser: async (req, res) => {
    try {
        const { name } = req.params;
        const userupdate = await User.findOneAndUpdate({name: name}, {$set: {name:'Diana'}});
        res.json(userupdate);
    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
},

// eliminar un usuario. delete

deleteUser: async (req, res) => {
    try {
        const {name} = req.params;
        const deleteUser = await User.findOneAndDelete({name: name})
        res.json(deleteUser)    

    } catch (error) {
        console.error('Error al borrar el usuario:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }

},

// esto guarda los datos del formulario en la base de datos. 

register: async (req, res) => {
    try {
        const users = await User.find();
        const {nombre, email, password} = req.body;
        
        const userData = {
            userid: users.length + 1,
            name: nombre,
            email: email,
            password: await bcrypt.hash(password, 10)
        }
        const newUser =  new User(userData);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);

    } catch (error) {
        console.error('Error al crear los usuarios', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
},

login: async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email: email});

        if (!user) {
            return res.status(401).json({ message: 'invalid username or password' });
        }
        const validPassword = await bcrypt.compare(password, user[0].password);

         if (!validPassword) {
             res.status(401).json({ message: 'invalid username or password' });
         }

        const token = jwt.sign({userid: user.id}, jwt_secret);
        expiresIn: '1h';
        
    } catch (error) {
        console.error('Error al crear los usuarios', error);
        res.status(500).json({ message: 'Internal Server Error' });
        
    }
}

}