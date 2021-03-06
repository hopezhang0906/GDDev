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

app.get('/portal', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/login.html'))
})

app.get('/portal/profile', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/profile.html'))
})



app.get('/project/create', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/createnewone.html'))
})

app.get('/projectEdit', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/editProject.html'))
})


app.get('/project', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/projectDetail.html'))
})

app.post('/portal/signup', (req, res) => {
    var body = req.body
    if (body == {}) {
        res.json({
            status: 'INVALID_BODY'
        })
    }

    body.id = shortid.generate()
    body.signupOn = new Date()
    database.portal.signup(body)

    res.redirect('/portal?signin')
})

app.get('/portal/signout', (req, res) => {
    var token = req.param.token
    if (token != null) {
        if (database.portal.validate(token)) {
            database.portal.invalidate(token)
            res.json({
                status: 'OK'
            })
        } else {
            res.statusCode = 403
            res.json({
                status: 'INVALID_TOKEN'
            })
        }
    } else {
        res.json({
            status: 'INVALID_PARAMETERS'
        })
    }
})

app.get('/portal/token/:token', (req, res) => {
    var token = req.params.token
    if (token != null) {
        if (database.portal.validate(token)) {
            res.json({
                status: 'OK'
            })
        } else {
            res.statusCode = 403
            res.json({
                status: 'INVALID_TOKEN'
            })
        }
    } else {
        res.json({
            status: 'INVALID_PARAMETERS'
        })
    }
})

app.post('/portal/auth', (req, res) => {
    var username = req.body.username
    var password = req.body.password
    if (username != null && password != null) {
        async.parallel([
            (cb) => {
                database.portal.auth({
                    email: username,
                    password: password
                }, cb)
            }
        ], (err, r) => {
            if (err != null) {
                res.status = 500
                res.json({
                    status: 'INTERNAL_ERROR'
                })
            }
            if (r[0] == null) {
                res.json({
                    status: 'INVALID_CREDENTIALS'
                })
            } else {
                res.json({
                    status: 'OK',
                    token: r[0]
                })
            }
        })
    } else {
        res.json({
            status: 'INVALID_PARAMETERS'
        })
    }
})

app.get('/portal/detail/:id', (req, res) => {
    var id = req.params.id
    if (id) {
        var result = database.portal.query(null, `id == "${id}"`)
        if (result != null) {
            delete result[0].password
            res.json({
                status: 'OK',
                result: result[0]
            })
        } else {
            res.json({
                status: 'ZERO_RESULT'
            })
        }
    } else {
        res.json({
            status: 'INVALID_PARAMETERS'
        })
    }
})

app.get('/project/detail/:id', (req, res) => {
    var id = req.params.id
    if (id) {
        var result = database.project.query(null, `id == "${id}"`)
        if (result != null) {
            res.json({
                status: 'OK',
                result: result[0]
            })
        } else {
            res.json({
                status: 'ZERO_RESULT'
            })
        }
    } else {
        res.json({
            status: 'INVALID_PARAMETERS'
        })
    }
})

app.get('/project/query/', (req, res) => {
    var sort = req.query.sort
    var filter = req.query.filter
    var result = database.project.query(sort, filter)
    if (result != null) {
        res.json({
            status: 'OK',
            result: result
        })
    } else {
        res.json({
            status: 'ZERO_RESULT'
        })
    }
})

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
        res.redirect(`/project?${body.id}`)
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
})

app.post('/project/update', (req, res) => {
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

app.post('/project/delete', (req, res) => {
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