const express = require('express')
const path = require('path')
const app = express()
const sqlite3 = require('sqlite3')
const {open} = require('sqlite')

const dbPromise = open({
    filename: './db/data.sqlite3',
    driver: sqlite3.Database
})

const port = process.env.PORT || 3000

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.use('/vandebib',require('./routes/adminApp'))
app.use('/boeken', require('./routes/boeken'))

app.set('view engine','ejs')

app.use('/', express.static('public'))
// app.use('/public', express.static(path.join(__dirname,'public')))

app.get('/', (req, res) => {
    res.render('index')
})

const setup = async () => {
    // kijk eerst of er een updat is voor de databank alvorens alles op te starten
    const db = await dbPromise
    await db.migrate()
    app.listen(port, () => {
        console.log(`App listening at port: ${port}`)
    })
}

setup();