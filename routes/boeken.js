const express = require('express')
const router = express.Router();

// import controller
const boekController = require('../controller/boek')

const boek = require('../db/boek')
const afdeling = require('../db/afdeling')
const plaats = require('../db/plaats')
const boekplaats = require('../db/boekplaats')


router.route('/')
    .get(boekController.getBoeken)
    .post(boekController.ontleenBoek)

router.route('/:qrcode')
    .get(boekController.getBoekByQR)

router.post('/leenboek', async(req,res) => {
    res.send('hallo')
    // boekplaats.addBoekbyPlaats({idboek: req.body.idboek, idplaats : req.body.idplaats})
    // res.render('index')
})

module.exports = router