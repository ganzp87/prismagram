import { prisma } from "../../../generated/prisma-client"

export default {
	GroupMessage: {
		from: ({ id }) => prisma.groupMessage({ id }).from(),
		to: ({ id }) => prisma.groupMessage({ id }).to(),
		room: ({ id }) => prisma.groupMessage({ id }).room(),
		file: ({ id }) => prisma.groupMessage({ id }).file(),
		isRead: ({ id }) => prisma.groupMessage({ id }).isRead(),
	},
}
