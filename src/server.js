import "./env"
import "./passport"
import logger from "morgan"
import schema from "./schema"
import { GraphQLServer } from "graphql-yoga"
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./middlewares"

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
	schema,
	context: (req) => {
		const { connection: { context = null } = {} } = req
		return {
			request: req.request,
			isAuthenticated,
			context
		}
	}
})

server.express.use(logger("dev"))

// jwt를 만드는 경로를 보호??
server.express.use(authenticateJwt)

server.start({ port: PORT }, () =>
	console.log(`🚀 Server running on http://localhost:${PORT}`)
)
