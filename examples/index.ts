import { IncomingMessage, ServerResponse } from 'http'
import { IFastFramework } from '../src/FastFramework.interface'
import { FastFramework } from '../src/FastFramework'
import { IRouter } from '../src/Routing/Router.interface'
import { Router } from '../src/Routing/Router'
import { IParser } from '../src/Parsing/Parser.interface'
import { Parser } from '../src/Parsing/Parser'

const port = 8000 
const app: IFastFramework = new FastFramework(new Router(new Parser()))

app.get('/products/:category/:id', (req: IncomingMessage, res: ServerResponse) => {
	const params = (req as any).params
	const query = (req as any).query
	const { id, category } = params

	res.statusCode = 200;
	res.end(`Product ID: ${id} in category: ${category} Query data: ${query.data}`);
});

app.get('/users/:id', (req: IncomingMessage, res: ServerResponse) => {
	const params = req.params;
	const { name } = req.query;
	const userId = params?.id;

	res.statusCode = 200;
	res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

app.get('/get-test', (req: IncomingMessage, res: ServerResponse) => {
	const { query } = req.query

	if (query === 'ping') {
		res.end(`Query: ${query} Response: pong`)
		return
	}

	res.statusCode = 200
	res.end('GET endpoint working')
})

app.post('/post-test', (req: IncomingMessage, res: ServerResponse) => {
	const { data } = req.body || 'data'

	if (data === 'ping') {
		res.end('Pong')
		return
	}

	res.statusCode = 201
	res.end(`Data received ${data}`)
})

app.put('/put-test', (req: IncomingMessage, res: ServerResponse) => {
	res.statusCode = 201
	res.end('PUT endpoint working')
})

app.delete('/delete-test', (req: IncomingMessage, res: ServerResponse) => {
	res.statusCode = 201
	res.end('DELETE endpoint working')
})

app.patch('/patch-test', (req: IncomingMessage, res: ServerResponse) => {
	res.statusCode = 201
	res.end('PATCH endpoint working')
})

app.listen(port)