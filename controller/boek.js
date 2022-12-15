const boek = require('../db/boek')

const getBoeken = async(req,res) => {
    const boeken = await boek.allboeken()
    res.send(boeken)
}

const ontleenBoek = async(req,res) => {
    boekplaats.addBoekbyPlaats({idboek: req.body.idboek, idplaats : req.body.idplaats})
    res.render('index')
}

module.exports = {
    getBoeken,
    ontleenBoek
}