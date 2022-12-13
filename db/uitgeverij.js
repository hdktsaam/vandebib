const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const allUitgeverijen = async () => {
    const db = await dbPromise
    return await db.all('select * from uitgeverij')
}

const addUitgeverij = async (uitgeverij) => {
    const db = await dbPromise
    const insertStatement = "insert into uitgeverij (omschrijvingKort, omschrijvingLang) values (?,?)"
    await db.run(insertStatement,[uitgeverij.omschrijvingKort, uitgeverij.omschrijvingLang])
}

module.exports = {
    addUitgeverij,
    allUitgeverijen
}