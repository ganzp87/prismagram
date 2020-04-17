import { sendPush } from "../utils"
import { prisma } from "../../generated/prisma-client"

export const createGroupMessage = async (room, roomId, text, user) => {
	const groupMemberList = await prisma.users({
		where: { AND: [{ rooms_some: { id: roomId } }, { id_not: user.id }] },
	})
	if (room === undefined) {
		// room이 없는 경우는 기존에 room이 존재하여 따로 생성하지 않음
		room = await prisma.room({ id: roomId })
		await Promise.all(
			groupMemberList.map((m) => {
				sendPush(m.pushToken, "동행", undefined, text)
			})
		)
	} else {
		// room이 있는 경우는 채팅방을 생성하였기 때문
		await Promise.all(
			groupMemberList.map((m) => {
				if (m.pushToken) {
					sendPush(
						m.pushToken,
						"동행",
						"새로운 채팅방이 생성되었습니다.",
						text
					)
				} else {
					console.log(`${m.username} has no token`)
				}
			})
		)
		if (user.pushToken) {
			await sendPush(
				user.pushToken,
				"동행",
				"새로운 채팅방이 생성되었습니다.",
				text
			)
		} else {
			console.log(`${user.username} has no token`)
		}
	}
	const usersIdList = groupMemberList.map((u) => ({
		id: u.id,
	}))
	return prisma.createMessage({
		text,
		from: {
			connect: { id: user.id },
		},
		to: {
			connect: [...usersIdList],
		},
		room: {
			connect: { id: room.id },
		},
		isRead: { connect: [...usersIdList] },
		file: null,
	})
}
