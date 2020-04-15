import { prisma } from "../../../../generated/prisma-client"

export default {
	Subscription: {
		newMessage: {
			subscribe: (_, args, context) => {
				// console.log(context)
				const { roomId, myEmail, toEmail } = args
				// console.log(roomId)
				try {
					if (roomId) {
						return prisma.$subscribe
							.message({
								OR: [
									{
										AND: [
											{ mutation_in: "CREATED" },
											{
												node: {
													AND: [
														{
															room: {
																id: roomId,
															},
														},
														{
															to: {
																email: myEmail,
															},
														},
													],
												},
											},
										],
									},
									{
										// AND: [
										// 	// { mutation_in: "UPDATED" },
										// 	// {
										// 	// 	updatedFields_contains:
										// 	// 		"isRead",
										// 	// },
										// 	// { mutation_in: "DELETED" },
										// 	{
										// 		node: {
										// 			AND: [
										// 				{
										// 					room: {
										// 						id: roomId,
										// 					},
										// 				},
										// 				{
										// 					from: {
										// 						email: myEmail,
										// 					},
										// 					isRead: true,
										// 				},
										// 			],
										// 		},
										// 	},
										// ],
									},
								],
							})
							.node()
					} else {
						return prisma.$subscribe
							.message({
								AND: [
									{ mutation_in: "CREATED" },
									{
										node: {
											to: { email: myEmail },
										},
									},
								],
							})
							.node()
					}
				} catch (error) {
					throw Error(error)
				}
			},
			resolve: (payload) => payload,
		},
	},
}
