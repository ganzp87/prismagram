import { prisma } from "../../../../generated/prisma-client"

export default {
	Query: {
		seeFullPost: async (_, args) => {
			const { id } = args
			try {
				const post = await prisma.post({ id })
				if (post) {
					return post
				} else {
					throw Error("There is no that post")
				}
			} catch (error) {
				throw Error(error)
			}
		}
	}
}
