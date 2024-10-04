const http = require('node:http')

export const FastFramework = () => {
	const routes = []

	const server = http.createServer((req, res) => {
		res.json = function(data) {
			res.setHeader('Content-Type', 'application/json')
			res.end(JSON.stringify(data))
		}

		let routeCounter: number = 0

		const next = () => {
			while (routeCounter < routes.length) {
				console.log('Next function while loop - Current counter: ', routeCounter)

				if (match(req, routes[routeCounter])) {
					return routes[routeCounter++].handler(req, res, next)
				} else {
					routeCounter++
				}
			}
		}

		next()
	})

	server.use = function use(url, method, handler) {
		routes.push({
			url,
			method,
			handler
		})
	}

	return server
}

const match = (req, { url, method }) => {
	if (!url && !method) return true
	if (req.method !== method) return false
	if (req.url !== url) return false

	return true
}
