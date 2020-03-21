import { prisma } from "../../../../generated/prisma-client"

const DELETE = "DELETE"
const EDIT = "EDIT"

export default {
	Mutation: {
		editPost: async (_, args, { request, isAuthenticated }) => {
			isAuthenticated(request)
			const { id, caption, location, actions } = args
			const post = await prisma.$exists.post({
				id,
				user: { id: request.user.id }
			})
			if (post) {
				if (actions === EDIT) {
					return await prisma.updatePost({
						data: { caption, location },
						where: {
							id
						}
					})
				} else if (actions === DELETE) {
					return await prisma.deletePost({
						id
					})
				}
			} else {
				throw Error("That post is already deleted")
			}
		}
	}
}
