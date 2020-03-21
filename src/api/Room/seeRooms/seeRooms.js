import { prisma } from "../../../../generated/prisma-client"
import { ROOM_FRAGMENT } from "../../../fragments"

export default {
	Query: {
		seeRooms: async (_, __, { request, isAuthenticated }) => {
			isAuthenticated(request)
			return prisma
				.rooms({
					where: { participants_some: { id: request.user.id } }
				})
				.$fragment(ROOM_FRAGMENT)
		}
	}
}
