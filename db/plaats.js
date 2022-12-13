const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const allPlaatsen = async () => {
    const db = await dbPromise
    return await db.all('select * from plaatsen')
}

const getPlaats = async (id) => {
    const db = await dbPromise
    return await db.all(`select * from plaats where idplaats = ${id}`)
}

const plaatsEnAfdeling = async (id) => {
    const db = await dbPromise
    plaats = await db.all('select * from plaatsen where idplaats = id')

}

module.exports = {
    allPlaatsen,
    getPlaats,
    plaatsEnAfdeling
}