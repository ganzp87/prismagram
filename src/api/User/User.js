import { prisma } from "../../../generated/prisma-client"

export default {
	User: {
		fullName: (parent) => {
			return `${parent.firstName} ${parent.lastName}`
		},
		isFollowing: (parent, _, { request }) => {
			const { user } = request
			const { id: parentId } = parent
			try {
				return prisma.$exists.user({
					AND: [
						{ id: parentId },
						{ followers_some: { id: user.id } },
					],
				})
			} catch (error) {
				console.log(error)
				return false
			}
		},
		isSelf: (parent, _, { request }) => {
			const { user } = request
			const { id: parentId } = parent
			return user.id === parentId
		},
		following: ({ id }) => prisma.user({ id }).following(),
		followers: ({ id }) => prisma.user({ id }).followers(),
		followingCount: async ({ id }) => {
			const following = await prisma.user({ id }).following()
			return following.length
		},
		followersCount: async ({ id }) => {
			const followers = await prisma.user({ id }).followers()
			return followers.length
		},
		likes: ({ id }) => prisma.user({ id }).likes(),
		posts: ({ id }) => prisma.user({ id }).posts(),
		postsCount: async ({ id }) => {
			const posts = await prisma.user({ id }).posts()
			return posts.length
		},
		comments: ({ id }) => prisma.user({ id }).comments(),
		rooms: ({ id }) => prisma.user({ id }).rooms(),
	},
}
