const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const boekAtPlaats = async (boekPlaatsID) => {
    const db = await dbPromise
    return await db.all(`select MAX(idboekplaats),* from boekplaats where idboek = ${boekPlaatsID}`)
}

const addBoekbyPlaats = async (boekplaats) => {
    const db = await dbPromise
    const insertStatement = "insert into boekplaats (idboek, idplaats, key) values (?,?,?)"
    const key = 'zernd1563!x'
    await db.run(insertStatement,[boekplaats.idboek, boekplaats.idplaats, key])
}

module.exports = {
    boekAtPlaats,
    addBoekbyPlaats
}