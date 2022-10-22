const path      = require('path');

const express   = require('express');
const cors      = require('cors');



class Server {

    
    constructor(){

        this.app    = express();
        this.port   = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            users: '/api/users',
            code: '/api/code'

        };

        this.middleware();

        this.routes();  

    }

    middleware(){
        //CORS 
        this.app.use( cors() );

        this.app.use( express.json() );
        this.app.use( express.urlencoded( {extended:false} ) );

        this.app.use( express.static( path.join( 'src', 'public' )) );

    }


    routes(){
        this.app.use( this.paths.auth, require('../router/auth.routes') );
        this.app.use( this.paths.users, require('../router/users.routes') );
        this.app.use( this.paths.code, require('../router/accesscode.routes') );
    }



    listen(){
        this.app.listen( this.port, () => {
            console.log(`Server on port ${ this.port }`);
        });
    }
}


module.exports = Server;