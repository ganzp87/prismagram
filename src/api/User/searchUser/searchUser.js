import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		searchUser: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { term } = args
			if (term.length > 0) {
				const users = await prisma.users({
					where: {
						OR: [
							{ username_contains: term },
							{ firstName_contains: term },
							{ lastName_contains: term },
						],
					},
				})
				if (users.length > 0) {
					return users
				} else {
					throw Error("there is no user")
				}
			} else {
				throw Error("Please enter a chacracter to search")
			}
		},
	},
}
