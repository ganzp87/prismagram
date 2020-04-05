import "./env"
import "./passport"
import logger from "morgan"
import schema from "./schema"
import { GraphQLServer } from "graphql-yoga"
import { authenticateJwt } from "./passport"
import { isAuthenticated } from "./middlewares"
import upload, { uploadMiddleware, upladController } from "./upload"

const PORT = process.env.PORT || 4000

const server = new GraphQLServer({
	schema,
	context: (req) => {
		const { connection: { context = null } = {} } = req
		return {
			request: req.request,
			isAuthenticated,
			context,
		}
	},
})
console.log(process.env["PRISMA_ENDPOINT"])
server.express.use(logger("dev"))

// jwt를 만드는 경로를 보호??
server.express.use(authenticateJwt)
server.express.post("/api/upload", uploadMiddleware, upladController)

server.start({ port: PORT }, () =>
	console.log(`🚀 Server running on http://localhost:${PORT}`)
)
