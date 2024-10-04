const { FastFramework } = require('../src/Lib')
const { Router } = require('../src/Routing/Router')
const bodyParser = require('body-parser')

const port = 8000

const app = FastFramework()

app.use('/user', 'POST', (req, res, next) => {
	console.log('body before:', req.body)
	next()
})

app.use(null, null, bodyParser.json())

app.use('/user', 'POST', (req, res) => {
	console.log('body after:', req.body)
	res.json({})
})

app.use('/users', 'GET', (req, res, next) => {
	console.log('authorized the user...')
	next()
})

app.use('/users', 'GET', (req, res, next) => {
	console.log('logged the user...')
	next()
})

app.use('/users', 'GET', (req, res, next) => {
	console.log('preparing the list of users...')
	res.json({ list: ['user1', 'user2', 'user3'], count: 3 })
})

app.use('/otherRoute', 'GET', (req, res, next) => {
	console.log('other route')
	res.end('other info')
})

app.use(null, null, (req, res) => {
	console.log('not_found')
	res.end('NOT_FOUND')
})

app.listen(port)

console.log(`Server running on port: ${port}`)