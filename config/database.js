const mongoose = require('mongoose');
let User;

const connectDatabase = async () => {
    try {
        if(!User){
            User = mongoose.model('User', require('../models/').Schema);
        }

        await mongoose.connect('mongodb+srv://william271629:3218741020@clusternotasdb.6dhty9c.mongodb.net/')
        .then(() => console.log('MongoDB connected'))
        .catch((err) => console.log(err));

        await iniciarData();
        
    } catch (error) {
        console.error('failed to connect to MongoDB', error);
        process.exit(1);
        
    }

};

 const iniciarData = async () => {
     try {
//         await User.insertMany([
//             {
//                 nombre: 'To Kill a Mockingbird',
//                 genero: 'ficcion',
//                 NumRef: 1123
//             },
//             {
//                 nombre: 'hello world',
//                 genero: 'terror',
//                 NumRef: 113454
//             }

//         ]);

//         await User.insertMany()
            console.log('Data duccessfully initialized');
        
        
    } catch (error) {
        console.error('Error al crear los usuarios', error);
        process.exit(1);
        
    }
};

module.exports = connectDatabase;