import { IncomingMessage, ServerResponse } from 'http'

const { FastFramework } = require('../src/Lib')

const port = 8000

const app = new FastFramework()

app.get('/get-test', (req: IncomingMessage, res: ServerResponse) => {
	const queryParams = req.url as unknown as URLSearchParams
	const query = queryParams['query'] || 'none'

	if (query === 'ping') {
		res.end(`Query: ${query} - pong`)
		return
	}

	res.statusCode = 200
	res.end('Get working')
})

app.post('/post-test', (req: IncomingMessage, res: ServerResponse) => {
	const body = req.body

	if (body.data === 'ping') {
		res.end('Pong')
		return
	}

	res.statusCode = 201
	res.end(`Data received ${body.data}`)
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
	req.

		res.statusCode = 201
	res.end('Data received')
})

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
