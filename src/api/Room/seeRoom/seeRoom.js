import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeRoom: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { id } = args
			const canSee = await prisma.$exists.room({
				participants_some: {
					id: request.user.id
				}
			})
			if (canSee) {
				const room = prisma.room({
					id
				})

				const messages = prisma
					.room({
						id
					})
					.messages()
				return {
					room,
					messages
				}
			} else {
				throw Error("You can't see this room")
			}
		}
	}
}
