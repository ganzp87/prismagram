import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeMe: (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const user = prisma.user({ id: request.user.id })
			return user
		}
	}
}
