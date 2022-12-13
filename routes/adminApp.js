const express = require('express')
const router = express.Router();
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')
const auteur = require('../db/auteurs')
const uitgeverij = require('../db/uitgeverij')
const boek = require('../db/boek')
const afdeling = require('../db/afdeling')
const key = require('../db/appkey')



const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

router.get('/',async(req,res) => {
    const db = await dbPromise
    const afdelingen = await db.all('Select * from afdeling;')
    console.log('==> ' + afdelingen);
    res.send(afdelingen)
    // res.render('scan')
})


router.get('/allBoeken', async(req,res) => {
    const resultaat = await boek.allboeken()
    res.render('boekenlst', {boeken: resultaat})
})

/** region maak items aan
 * 
 */
 router.post('/maakafdeling', async(req, res) => {
    afdeling.addAfdeling({omschrijvingKort: req.body.Code,omschrijvingLang: req.body.Omschrijving})
    res.render('index')
})

router.post('/updateafdeling', async(req, res) => {
    afdeling.updateAfdeling({omschrijvingKort: req.body.Code,omschrijvingLang: req.body.Omschrijving,idafdeling: req.body.ID})
    res.render('index')
})

router.post('/maakAuteur', async (req, res) => {
    auteur.addAuteur({naam: req.body.naamAuteur})
    res.render('index')
})

router.post('/maakuitgeverij', async (req, res) => {
    uitgeverij.addUitgeverij({omschrijvingKort: req.body.OmschrijvingKort,omschrijvingLang: req.body.OmschrijvingLang})
    res.render('index')
})

router.post('/maakboek', async (req, res) => {
    // opgelet - vast auteur en uitgeverij

    boek.addBoek({titel: req.body.titel, idauteur : req.body.idauteur, iduitgeverij : req.body.iduitgeverij, url : req.body.iduitgeverij})
    res.render('index')
})

router.post('/updateBoek', async (req, res) => {
    boek.updateBoek({urlAfbeelding: req.body.urlAfbeelding, id: req.body.idboek})
    res.send('gelukt')
})

router.post('/maakKey', async (req,res) => {
    key.addKey({key: req.body.key})
    res.render('index')
})

 router.post('/maakPlaats', async(req, res) => {
    const db = await dbPromise

    const insertStatement = "insert into plaats (idafdeling, omschrijvingKort, omschrijvingLang) values (?,?,?)"

    const afdeling = {
        idafdeling: req.body.afdeling,
        kort: req.body.kort,
        lang: req.body.lang
    }

    db.run(insertStatement, [afdeling.idafdeling, afdeling.kort, afdeling.lang])

    res.render('index')
})

/** einde items aanmaken */

router.get('/aanmaken', async(req, res) => {
    const db = await dbPromise	
    const afdelingen = await afdeling.allAfdelingen()
    const uitgeverijen = await uitgeverij.allUitgeverijen()
    const auteurs = await auteur.allAuteurs()

    res.render('admin_create', {afdelingen, uitgeverijen, auteurs})
})

module.exports = router