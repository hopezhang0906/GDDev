'use strict';

var express = require('express');
var app = express();
var path = require('path');

app.use('/public', express.static(path.resolve(__dirname, '../dist/public')));

app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.get('/login', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/login.html'))
})

app.get('/create', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/createnewone.html'))
})

app.get('/alltypes', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../dist/alltypes.html'))
})


app.listen(8860, function () {
    console.log("Go!");
})