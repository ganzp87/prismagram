import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeMe: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const user = await prisma.user({ id: request.user.id })
			return user
		},
	},
}
