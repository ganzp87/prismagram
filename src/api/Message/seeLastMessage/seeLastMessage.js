import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeLastMessage: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId } = args
			try {
				const messages = await prisma.messages({
					where: { room: { id: roomId } },
				})
				if (messages) {
					const message = messages[messages.length - 1]
					console.log(message)
					return message
				} else {
					throw Error("Can't find messages")
				}
			} catch (error) {
				throw Error(error)
			}
		},
	},
}
