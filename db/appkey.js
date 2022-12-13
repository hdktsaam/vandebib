const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const getKey = async () => {
    const db = await dbPromise
    return await db.all('select * from appKey')
}

const addKey = async (key) => {
    const db = await dbPromise
    const insertStatement = "insert into appkey (key) values (?)"
    await db.run(insertStatement, key.key)
}

module.exports = {
    getKey,
    addKey
}