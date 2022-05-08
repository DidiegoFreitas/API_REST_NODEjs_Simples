const EXPRESS = require('express');
const APP = EXPRESS();
const HTTP = require('http');
const PORT = process.env.PORT || 3001;
const SERVER = HTTP.createServer(APP);
const MORGAN = require('morgan');
const BODYPARSER = require('body-parser');

const ROTA = require('./routes');

APP.use(MORGAN('dev'));

APP.use(BODYPARSER.urlencoded({ extended: false })); // apenas dados simples
APP.use(BODYPARSER.json()); // json de entrada no body

APP.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }
    next();
});

APP.use('/', ROTA);

APP.use((req, res, next)=>{
    const ERRO = new Error();
    ERRO.msg = 'Não encontrado!';
    ERRO.status = 404;
    next(ERRO);
});

APP.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.msg
        }
    });
});

SERVER.listen(PORT, ()=>{
    console.log(`> Server API Rodando na porta ${PORT}`);
});
