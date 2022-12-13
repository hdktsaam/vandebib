const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const allAfdelingen = async () => {
    const db = await dbPromise
    return await db.all('select * from afdeling')
}

const getAfdeling = async (id) => {
    const db = await dbPromise
    return await db.all(`select * from afdeling where idafdeling = ${id}`)
}

const addAfdeling = async (afdeling) => {
    const db = await dbPromise
    const insertStatement = "insert into afdeling (omschrijvingKort, omschrijvingLang) values (?,?)"
    console.log(afdeling);
    await db.run(insertStatement, [afdeling.omschrijvingKort, afdeling.omschrijvingLang])
}

const updateAfdeling = async (afdeling) => {
    const db = await dbPromise
    const updateStatement = "update afdeling set omschrijvingKort = ?, omschrijvingLang = ? where idafdeling = ?"
    await db.run(updateStatement, [afdeling.omschrijvingKort, afdeling.omschrijvingLang,afdeling.idafdeling])
}

module.exports = {
    addAfdeling,
    updateAfdeling,
    allAfdelingen,
    getAfdeling
}