import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeMe: (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const userProfile = prisma.user({ id: request.user.id })
			const posts = prisma.user({ id: request.user.id }).posts()
			return {
				user: userProfile,
				posts
			}
		}
	}
}
