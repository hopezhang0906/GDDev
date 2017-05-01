'use strict';

var path = require('path');
var express = require('express');

var app = express();
app.use('/public', express.static(path.resolve(__dirname, '../dist/public')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})

app.get('/login', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/login.html'))
})

app.get('/creat', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../dist/createnewone.html'))
})

app.get('/database/project/:id', (req, res) => {
    console.log('project request')
    res.json({ id: req.params.id })
})

app.listen(8860, () => {
    console.log("Go!");
})