import { prisma } from "../../../../generated/prisma-client"

export default {
	Subscription: {
		newMessage: {
			subscribe: (_, args, context) => {
				// console.log(context)
				const { roomId, email } = args
				return prisma.$subscribe
					.message({
						AND: [
							{ mutation_in: "CREATED" },
							{
								node: {
									AND: [
										{ room: { id: roomId } },
										{ to: { email: email } },
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
