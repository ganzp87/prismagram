import { prisma } from "../../../../generated/prisma-client"

export default {
	Subscription: {
		SubsReadMessage: {
			subscribe: (_, args) => {
				const { email, roomId } = args
				// console.log("test------111111")
				return prisma.$subscribe
					.message({
						AND: [
							{
								node: {
									AND: [
										{
											room: {
												id: roomId,
											},
										},
										{
											from: {
												email: email,
											},
											isRead: true,
										},
									],
								},
							},
						],
					})
					.node()
			},
			resolve: (payload) => payload,
		},
	},
}
