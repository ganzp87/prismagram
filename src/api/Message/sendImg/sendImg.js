import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		sendImg: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId, toId, url } = args
			const { user } = request
			const file = await prisma.createFile({
				url
			})
			const message = await prisma.createMessage({
				file: { connect: { id: file.id } },
				from: { connect: { id: user.id } },
				to: { connect: { id: toId } },
				room: { connect: { id: roomId } },
				isRead: false
			})
			console.log(file)
			return message
		}
	}
}
