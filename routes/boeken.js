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

router.get('/:qrcode',async(req,res) => {
    const findboek = await boek.getBoekByQR(req.params.qrcode)
    const plaatsen = await plaats.allPlaatsen()
    const bplaats = await boekplaats.boekAtPlaats(findboek.idboek)
    // const afdelingBoek = await afdeling.getAfdeling(bplaats[0].afdeling)
    const pl= bplaats[0]
    console.log(findboek);
    console.log(pl);
    const plaatsinfo = await plaats.getPlaats(bplaats[0].idplaats)
    const afdelinginfo = await afdeling.getAfdeling(plaatsinfo[0].idafdeling)
    const achterliggendeInfo = {
        infplaats: plaatsinfo[0],
        infafdeling: afdelinginfo[0]
    }
    
    res.render('gbrLanding',{findboek,plaatsen,pl,achterliggendeInfo})
})

router.post('/leenboek', async(req,res) => {
    boekplaats.addBoekbyPlaats({idboek: req.body.idboek, idplaats : req.body.idplaats})
    res.render('index')
})

module.exports = router