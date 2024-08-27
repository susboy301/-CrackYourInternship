const express = require('express')
const mongoose = require('mongoose')
//const cors=require('cors')
const alienRouter = require('./routes/controller_052')

//const url = 'mongodb://127.0.0.1:27020,127.0.0.1:27021,127.0.0.1:27022/cbitit1?replicaSet=m101'
const url = 'mongodb://127.0.0.1:27017/FSD_052'
const app = express()
mongoose.connect(url)
const con = mongoose.connection


con.on('open', () =>
{
console.log('connected...')
})
//app.use(cors())
app.use(express.json())

app.use('/aliens',alienRouter)
app.listen(9000, () =>
{
console.log('Server started')
})
