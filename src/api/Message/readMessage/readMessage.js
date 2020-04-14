import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		readMessage: async (_, args, { request, isAuthenticated }) => {
			// isAuthenticated(request)
			const { roomId, email } = args
			const isRead = true
			try {
				const messages = await prisma.messages({
					where: { AND: { room: { id: roomId }, to: { email } } }
				})
				if (messages) {
					messages.map(
						async m =>
							// console.log(m),
							await prisma.updateMessage({
								where: { id: m.id },
								data: { isRead }
							})
					)
					console.log("ok")
					return messages
				} else {
					throw Error("Error")
				}
			} catch (error) {
				throw Error(error)
			}
		}
	}
}
