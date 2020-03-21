import "./env"
import { GraphQLServer } from "graphql-yoga"
import logger from "morgan"
import schema from "./schema"
import { authenticateJwt } from "./passport"
import "./passport"

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
	schema,
	context: ({ request }) => ({ request })
})

server.express.use(logger("dev"))

// jwt를 만드는 경로를 보호??
server.express.use(authenticateJwt)

server.start({ port: PORT }, () =>
	console.log(`🚀 Server running on http://localhost:${PORT}`)
)
