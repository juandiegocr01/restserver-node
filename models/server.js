const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/users',
            categorias: '/api/categorias'
        }


        //conectar a base de datos

        this.conectarDB();
        

        //Middlewares le añade funciones al webserver
        this.middlewares();

        //Rutas de la aplicación
        this.routes();

      
    }

    async conectarDB(){
        await dbConnection();
      }


    middlewares(){

        //es algo que se llama antes de ejecutar una función como tal

        //CORS

        this.app.use(cors());

        //Parseo y lectura del body

        this.app.use(express.json());

        //Directorio público
        this.app.use(express.static('public'));
    }


    routes() {

       this.app.use(this.paths.auth, require('../routes/auth'));
       this.app.use(this.paths.usuarios, require('../routes/user'));
       this.app.use(this.paths.categorias, require('../routes/categorias'));

    }


    listen() {

        //forma en que traigo el puerto del archivo .env

        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        });
    }
}


module.exports = Server;