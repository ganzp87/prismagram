import { prisma } from "../../../../generated/prisma-client"
import axios from "axios"
import { sendPush } from "../../../utils"
import createRoom from "../../../component/createRoom"
import { createGroupMessage } from "../../../component/CommonMessage"

export default {
	Mutation: {
		sendMessage: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { roomId, text, toId, isGroup } = args
			const { user } = request
			try {
				// 단체 대화방
				if (isGroup) {
					// 대화방이 없는 경우 새로 생성 후 메세지 전송
					if (roomId === undefined) {
						if (user.id !== toId) {
							const room = await createRoom(toId, user, isGroup)
							if (room) {
								return createGroupMessage(
									room,
									room.id,
									text,
									user
								)
							} else {
								throw Error("Room not found")
							}
						} else {
							return Error("You can't send a message to yourself")
						}
					}
					return createGroupMessage(undefined, roomId, text, user)
					// 개인 대화방
				} else {
					let room
					// 대화방이 없는 경우 새로 생성 후 메세지 전송
					if (roomId === undefined) {
						if (user.id !== toId) {
							room = await createRoom(toId, user, isGroup)
						} else {
							return Error("You can't send a message to yourself")
						}
					} else {
						room = await prisma.room({ id: roomId })
					}
					if (!room) {
						throw Error("Room not found")
					}
					const pushToken = await prisma
						.user({ id: toId })
						.pushToken()
					sendPush(pushToken, "양도", undefined, text)

					const participant = await prisma
						.room({ id: room.id })
						.participants()
					const getTo = participant.filter(
						(participant) => participant.id !== user.id
					)[0]
					return prisma.createMessage({
						text,
						from: {
							connect: { id: user.id },
						},
						to: {
							connect: { id: roomId ? getTo.id : toId },
						},
						room: {
							connect: { id: room.id },
						},
						isRead: false,
						file: null,
					})
				}
			} catch (error) {
				console.log(error)
			}
		},
	},
}
