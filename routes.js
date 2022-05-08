const express = require('express');
const router = express.Router();

router.get('/teste', (req, res, next)=>{
    res.status(200).send({mensagem:'OK, deu certo dentro da rota!'});
});

router.use((req, res, next)=>{
    const ERRO = new Error();
    ERRO.msg = 'Rota não encontrada!';
    ERRO.status = 404;
    next(ERRO);
});

module.exports = router;