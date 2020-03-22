import { prisma } from "../../../generated/prisma-client"

export default {
	Post: {
		files: ({ id }) => prisma.post({ id }).files(),
		user: ({ id }) => prisma.post({ id }).user(),
		comments: ({ id }) => prisma.post({ id }).comments(),
		likes: ({ id }) => prisma.post({ id }).likes(),
		isLiked: async (parent, _, { request }) => {
			const { user } = request
			const { id } = parent
			return prisma.$exists.like({
				AND: [
					{
						user: {
							id: user.id
						}
					},
					{
						post: {
							id
						}
					}
				]
			})
		},
		likeCount: (parent) =>
			prisma
				.likesConnection({ where: { post: { id: parent.id } } })
				.aggregate()
				.count()
	}
}
