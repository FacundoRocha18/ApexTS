const { FastFramework } = require('../src/Lib')
const { Router } = require('../src/Routing/Router')
const bodyParser = require('body-parser')

const port = 8000

const app = new FastFramework()

app.get('/get-test', (req, res) => {
	res.statusCode = 200
	res.end('Hello world')
})

app.post('/post-test', (req, res) => {
	res.statusCode = 201
	res.end('Data received')
})

app.put('/put-test', (req, res) => {
	res.statusCode = 201
	res.end('Data received')
})

app.delete('/delete-test', (req, res) => {
	res.statusCode = 201
	res.end('Data received')
})

app.patch('/patch-test', (req, res) => {
	res.statusCode = 201
	res.end('Data received')
})

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
