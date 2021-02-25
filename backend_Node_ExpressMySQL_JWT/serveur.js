const http = require('http');  // importer le package de serveur http de Node.js. L'objet 'http' permet de créer un serveur.
const app = require ('./app.js');

const normalizePort = val => {

    // normalizePort() :  renvoie un port valide, qu'il soit fourni sous la forme d'un numéro 
    //                    ou d'une chaîne ;

    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
};

const port = normalizePort(process.env.PORT ||'8080');
app.set('port', port);


const errorHandler = error => {
    // errorHandler() :  recherche les différentes erreurs et les gère de manière appropriée. 
    //                   Elle est ensuite enregistrée dans le serveur ;

    if (error.syscall !=='listen') {
        throw error;
    }
    
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address : 'port' + port;
    switch (error.code) {
        case 'EACCES':
            console.error( bind + 'requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error (bind + 'is already in use.');
            process.exit(1);
            break;
        default:
            throw error;
    }
};

// app.set('port', 3005 || process.env.PORT); // replaced by above

const server = http.createServer(app);

server.on('error', errorHandler);
server.on ('listening', () => {
    // écouteur d'évènements,  également enregistré, consignant le port ou le canal 
    // nommé sur lequel le serveur s'exécute dans la console.
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe' + address: 'port' + port;
    console.log('Listening on ' + bind);
});

server.listen(port);