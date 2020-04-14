import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		savePushToken: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { email, pushToken } = args
			try {
				return await prisma.updateUser({
					data: { pushToken },
					where: { email }
				})
			} catch (error) {
				throw Error(error)
			}
		}
	}
}
