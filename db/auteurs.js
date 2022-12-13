const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const allAuteurs = async () => {
    const db = await dbPromise
    return await db.all('select * from auteur')
}

const addAuteur = async (auteur) => {
    const db = await dbPromise
    const insertStatement = "insert into auteur (naam) values (?)"
    await db.run(insertStatement, auteur.naam)
}

module.exports = {
    addAuteur,
    allAuteurs
}