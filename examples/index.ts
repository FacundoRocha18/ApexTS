import { IFastFramework } from '../src/FastFramework.interface'
import { FastFramework } from '../src/FastFramework'
import { Router } from '../src/Routing/Router'
import { Parser } from '../src/Parsing/Parser'
import { Request, Response } from '../src/types'
import { Middlewares } from '../src/Middlewares/Middlewares'

const port = 8000

const parser = new Parser()
const middlewares = new Middlewares()
const router = new Router(parser)
const app: IFastFramework = new FastFramework(router)

router.use(middlewares.logger)
router.use(middlewares.auth)

app.get('/products/:category/:id', (req: Request, res: Response) => {
	const params = (req as any).params
	const query = (req as any).query
	const { id, category } = params

	const response = {
		productId: id,
		productCategory: category,
		query
	}

	res.setHeader('Content-type', 'application/json')
	res.statusCode = 200;
	res.end(JSON.stringify(response));
});

app.get('/users/:id', (req: Request, res: Response) => {
	const params = req.params;
	const { name } = req.query;
	const userId = params?.id;

	res.statusCode = 200;
	res.end(`User ID: ${userId}, Query Params: ${JSON.stringify(name)}`);
});

app.get('/get-test', (req: Request, res: Response) => {
	const { query } = req.query

	if (query === 'ping') {
		res.end(`Query: ${query} Response: pong`)
		return
	}

	res.statusCode = 200
	res.end('GET endpoint working')
})

app.post('/post-test', (req: Request, res: Response) => {
	const { data } = req.body || 'data'

	if (data === 'ping') {
		res.end('Pong')
		return
	}

	res.statusCode = 201
	res.end(`Data received ${data}`)
})

app.put('/put-test', (req: Request, res: Response) => {
	res.statusCode = 201
	res.end('PUT endpoint working')
})

app.del('/delete-test', (req: Request, res: Response) => {
	res.statusCode = 201
	res.end('DELETE endpoint working')
})

app.patch('/patch-test', (req: Request, res: Response) => {
	res.statusCode = 201
	res.end('PATCH endpoint working')
})

app.listen(port)