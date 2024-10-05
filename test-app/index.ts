import { IncomingMessage, ServerResponse } from 'http'

const { FastFramework } = require('../src/Lib')

const port = 8000

const app = new FastFramework()

app.get('/products/:category/:id', (req, res) => {
  const params = (req as any).params;
  const category = params?.category;
  const productId = params?.id;
  res.statusCode = 200;
  res.end(`Producto ID: ${productId} en categoría: ${category}`);
});

app.get('/users/:id', (req, res) => {
  const params = (req as any).params;
  const { name } = (req as any).query;
  const userId = params?.id;

  res.statusCode = 200;
  res.end(`Usuario con ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

app.get('/get-test', (req: IncomingMessage, res: ServerResponse) => {
	const queryParams = req.url as unknown as URLSearchParams
	const { query } = (req as any).query

	if (query === 'ping') {
		res.end(`Query: ${query} Response: pong`)
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
