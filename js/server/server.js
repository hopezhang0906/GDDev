'use strict'

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var shortid = require('shortid')
var async = require('async')

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

function combineArray(obj, keys, names, cb) {
    var result = new Array()
    let a = obj[keys[0]]
    let b = obj[keys[1]]
    if (a == null || b == null) cb()

    var l = a.length
    if (l == 0) cb()

    for (var i in a) {
        result.push({
            [names[0]]: a[i],
            [names[1]]: b[i]
        })
        if (i == l - 1) {
            delete obj[keys[0]]
            delete obj[keys[1]]
            obj[names[2]] = result
            cb()
            return
        }
    }
}

app.post('/project/add', (req, res) => {
    let body = req.body
    if (!body) {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing object parameter'
        })
    }
    async.parallel([
        //info
        (cb) => {
            combineArray(body, ['infoTitle', 'infoContent'], ['title', 'content', 'info'], cb)
        },
        //tags
        (cb) => {
            combineArray(body, ['tags', 'tags'], ['name', 'description', 'tags'], cb)
        },
        //makers
        (cb) => {
            combineArray(body, ['makersName', 'makersRole'], ['name', 'role', 'makers'], cb)
        }
    ],
    (err, r) => {
        body.id = shortid.generate()
        body.uploaderId = shortid.generate()
        body.uploadedOn = body.lastModifiedOn = new Date()
        body.finishedOn = new Date(body.finishedOn)
        database.project.add(body)
        res.redirect('/')
    })
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