import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		editUser: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { email, username, firstName, lastName, bio, avatar } = args
			const { user } = request
			try {
				return prisma.updateUser({
					where: { id: user.id },
					data: {
						email,
						username,
						firstName,
						lastName,
						bio,
						avatar
					}
				})
			} catch (error) {
				throw Error(error)
			}
		}
	}
}
