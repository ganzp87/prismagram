import { isAuthenticated } from "../../../middlewares"
import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		follow: async (_, args, { request }) => {
			isAuthenticated(request)
			const { user } = request
			const { id } = args
			try {
				const existingFollowing = await prisma.$exists.user({
					AND: [{ id: user.id }, { following_some: { id } }]
				})
				if (existingFollowing) {
					await prisma.updateUser({
						where: { id: user.id },
						data: {
							following: {
								disconnect: {
									id
								}
							}
						}
					})
				} else {
					await prisma.updateUser({
						where: {
							id: user.id
						},
						data: {
							following: {
								connect: {
									id
								}
							}
						}
					})
				}
				return true
			} catch (error) {
				return false
			}
		}
	}
}
