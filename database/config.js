const mongoose = require('mongoose');


const dbConnection = async () =>{

try{

  await mongoose.connect(process.env.MONGODB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  console.log('Base de datos conectada');

}catch(err){
    throw new Error('Error a la hora de conectarse a la base de datos');
}

}


module.exports = {dbConnection};