import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		sendMessage: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId, text, toId } = args
			const { user } = request
			let room
			if (roomId === undefined) {
				if (user.id !== toId) {
					room = await prisma.createRoom({
						participants: {
							connect: [
								{
									id: toId
								},
								{ id: user.id }
							]
						}
					})
				} else {
					return Error("You can't send a message to yourself")
				}
			} else {
				room = await prisma.room({ id: roomId })
			}
			if (!room) {
				throw Error("Room not found")
			}
			const participant = await prisma
				.room({ id: room.id })
				.participants()
			const getTo = participant.filter(
				(participant) => participant.id !== user.id
			)[0]
			return prisma.createMessage({
				text,
				from: {
					connect: { id: user.id }
				},
				to: {
					connect: { id: roomId ? getTo.id : toId }
				},
				room: {
					connect: { id: room.id }
				}
			})
		}
	}
}
