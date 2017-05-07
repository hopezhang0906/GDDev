'use strict'

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')

var app = express()
app.use('/public', express.static(path.resolve(__dirname, '../dist/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

var schemas = require('./schemas')
var database = require('./database')
database.init()

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/login.html'))
})

app.get('/create', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/createnewone.html'))
})

app.get('/alltypes', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/alltypes.html'))
})

app.get('/createTest', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/createTest.html'))
})


app.get('/db/get/project/:id', (req, res) => {
    var id = req.params.id
    if (id) {
        var result = database.get.byId(schemas.ProjectSchema.name, id)
        if (result) {
            res.json({
                status: 'OK',
                result: result
            })
        } else {
            res.json({
                status: 'ZERO_RESULT'
            })
        }
    } else {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing id parameter'
        })
    }
})

app.post('/db/edit/add', (req, res) => {
    console.log(req.body)
    var object = req.body.project
    //res.redirect('/')
    if (object) {
        database.edit.add(object)
        res.json({ status: 'OK' })
    } else {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing object parameter'
        })
    }
})

app.post('/db/edit/update', (req, res) => {
    var object = req.body.project
    if (object) {
        database.edit.update(object)
        res.json({ status: 'OK' })
    } else {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing object parameter'
        })
    }
})

app.post('/db/edit/delete', (req, res) => {
    var object = req.body.project
    if (object) {
        database.edit.delete(object)
        res.json({ status: 'OK' })
    } else {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing object parameter'
        })
    }
})

app.listen(8860, function () {
    console.log("Go!");
})