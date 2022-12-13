const sqlite3 = require('sqlite3').verbose()

const db = new sqlite3.Database('./db/bib.sqlite3', (err)=> {
    if (err) {
        return console.error(err.message);
    }
    console.log('connected');
})

module.exports = db