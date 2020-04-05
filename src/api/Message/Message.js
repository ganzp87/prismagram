import { prisma } from "../../../generated/prisma-client"

export default {
	Message: {
		to: ({ id }) => prisma.message({ id }).to(),
		from: ({ id }) => prisma.message({ id }).from(),
		room: ({ id }) => prisma.message({ id }).room(),
	},
}
