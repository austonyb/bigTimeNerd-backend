require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const {SERVER_PORT} = process.env || 4004
const schedule = require('node-schedule')

//controller files
const { retrieveAllPosts, retrieveAuthorList, cachePosts } = require('./controllers/postController.js')

//this is where the caching service will be

const rule = new schedule.RecurrenceRule()
rule.hour = 16
rule.minute = 31

const job = schedule.scheduleJob(rule, cachePosts)


app.use(express.json())
app.use(cors())

//test endpoint
app.get('/authors', retrieveAuthorList)

//express lifecycle
app.listen(SERVER_PORT, () => console.log(`up on ${SERVER_PORT}.`))