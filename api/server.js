// build your server here and require it from index.js
const express = require('express')
const resoureRouter = require('./resource/router')
const projectRouter = require('./project/router')
const taskRouter = require('./task/router')

const server = (express.json());
server.use('/api/resources', resoureRouter)
server.use('/api/projects', projectRouter)
server.user('/api/tasks', taskRouter)

server.use('*', (req, res) => {
    res.status(404).json({ message: '404 not found' })
})

server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
        stack: err.stack
    })
})

module.exports = server;
