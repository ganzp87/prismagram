import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		readMessage: async (_, args, { request, isAuthenticated }) => {
			// isAuthenticated(request)
			const { roomId, email } = args
			// const isRead = true
			try {
				let messages = await prisma.messages({
					where: {
						AND: { room: { id: roomId }, to_some: { email } },
					},
				})
				if (messages) {
					messages = await Promise.all(
						messages.map((m) =>
							// console.log(m),
							prisma.updateMessage({
								where: { id: m.id },
								data: { isRead: { disconnect: { email } } },
							})
						)
					)
					console.log("ok")
					return messages
				} else {
					throw Error("Error")
				}
			} catch (error) {
				throw Error(error)
			}
		},
	},
}
