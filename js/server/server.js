'use strict'

var path = require('path')
var express = require('express')
var bodyParser = require('body-parser')
var shortid = require('shortid')

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

app.get('/project/:id', (req, res) => {
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

app.post('/project/add', (req, res) => {
    var data = req.body
    if (!data) {
        res.json({
            status: 'ERROR',
            errorMessage: 'Missing object parameter'
        })
    }

    data.id = shortid.generate()
    data.uploadedOn = new Date()
    data.lastModifiedOn = new Date()

    data.info = new Array()
    var info = new Array()
    for (var i in data.infoTitle) {
        info.push({
            title: data.infoTitle[i],
            content: data.infoContent[i]
        })
    }
    delete data.infoTitle
    delete data.infoContent

    data.tags = new Array()
    var tags = new Array();
    for (var i in data.tagsName) {
        tags.push({
            name: data.tagsName[i],
            description: data.tagsName[i]
        })
    }
    delete data.tagsName

    data.makers = new Array()
    var makers = new Array()
    for (var i in data.makersName) {
        makers.push({
            name: data.makersName[i],
            role: data.makersRole[i]
        })
    }
    delete data.makersName
    delete data.makersRole

    setTimeout(() =>
    {
        console.info(data)
        database.project.add(data, info, tags, makers)
        res.redirect(`/project/${data.id}`)
    }, 1000);
   
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