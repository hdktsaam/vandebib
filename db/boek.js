const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const addBoek = async (boek) => {
    const db = await dbPromise
    const insertStatement = "insert into boek (qrcode, titel, idauteur, iduitgeverij,figuurURL) values (?,?,?,?,?)"
    let timestamp = Date.now()
    let qrcode = timestamp + boek.idauteur + boek.iduitgeverij
    await db.run(insertStatement,[qrcode, boek.titel, boek.idauteur, boek.iduitgeverij, boek.url])
}

const updateBoek = async (boek) => {
    const db = await dbPromise
    console.log(boek.urlAfbeelding, boek.id)
    const updateStatement = "update boek set figuurURL = ? where idboek = ?"
    await db.run(updateStatement, [boek.urlAfbeelding,boek.id])
}

const allboeken = async () => {
    const db = await dbPromise
    return await db.all('select * from boeken')
}

const getBoek = async (id) => {
    const db = await dbPromise
    const resultaat = await db.all(`select * from boeken where idboek = ${id}`)
    return resultaat[0]
}

const getBoekByQR = async (qrcode) => {
    const db = await dbPromise
    
    const resultaat = await db.all(`select * from boeken where qrcode = '${qrcode}'`)
    return resultaat[0]
}



module.exports = {
    addBoek,
    allboeken,
    getBoek,
    getBoekByQR,
    updateBoek
}