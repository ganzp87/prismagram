import { prisma } from "../../../../generated/prisma-client"
import axios from "axios"
import { sendPush } from "../../../utils"

export default {
	Mutation: {
		sendGroupMessage: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId, text } = args
			const { user } = request
			let groupMemberList
			try {
				// 단체 대화방
				groupMemberList = await prisma.users({
					where: { rooms_some: roomId },
				})
				groupMemberList.map(async (m) => {
					sendPush(m.pushToken)
				})
				room = await prisma.room({ id: roomId })
				return prisma.createGroupMessage({
					text,
					from: {
						connect: { id: user.id },
					},
					to: {
						connect: [...groupMemberList],
					},
					room: {
						connect: { id: room.id },
					},
					isRead: [],
					file: null,
				})
			} catch (error) {
				console.log("PushToken이 없습니다.")
			}
		},
	},
}
