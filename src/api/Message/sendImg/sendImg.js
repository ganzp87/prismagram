import { prisma } from "../../../../generated/prisma-client"
import axios from "axios"

export default {
	Mutation: {
		sendImg: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId, toId, url } = args
			const { user } = request
			const file = await prisma.createFile({
				url
			})
			const pushToken = await prisma.user({ id: toId }).pushToken()
			const message = await prisma.createMessage({
				file: { connect: { id: file.id } },
				from: { connect: { id: user.id } },
				to: { connect: { id: toId } },
				room: { connect: { id: roomId } },
				isRead: false
			})
			try {
				const { data } = await axios.post(
					"https://exp.host/--/api/v2/push/send",
					{
						to: pushToken,
						title: "새로운 메세지가 도착하였습니다!",
						body: "사진"
					}
				)
				console.log(data)
				console.log(file)
				return message
			} catch (error) {
				throw Error(error)
			}
		}
	}
}
