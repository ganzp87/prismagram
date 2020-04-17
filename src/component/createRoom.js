import { prisma } from "../../generated/prisma-client"

const createRoom = (toId, user, isGroup) =>
	prisma.createRoom({
		participants: {
			connect: [
				{
					id: toId,
				},
				{ id: user.id },
			],
		},
		isGroup,
	})

export default createRoom
