import { prisma } from "../../../../generated/prisma-client"
import { ROOM_FRAGMENT, MESSAGE_FRAGMENT } from "../../../fragments"

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
				const room = prisma
					.room({
						id
					})
					.$fragment(ROOM_FRAGMENT)

				const messages = prisma
					.room({
						id
					})
					.messages()
					.$fragment(MESSAGE_FRAGMENT)
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
