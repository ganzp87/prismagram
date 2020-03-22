import { prisma } from "../../../../generated/prisma-client"

export default {
	Subscription: {
		newMessage: {
			subscribe: (_, args, context) => {
				// console.log(context)
				const { roomId, toId } = args
				return prisma.$subscribe
					.message({
						AND: [
							{ mutation_in: "CREATED" },
							{
								node: {
									AND: [
										{ room: { id: roomId } },
										{ to: { id: toId } }
									]
								}
							}
						]
					})
					.node()
			},
			resolve: (payload) => payload
		}
	}
}
