import { prisma } from "../../../../generated/prisma-client"

export default {
	Mutation: {
		createAccount: async (_, args) => {
			const {
				username,
				email,
				firstName = "",
				lastName = "",
				bio = ""
			} = args
			const exist = await prisma.$exists.user({
				OR: [
					{
						username
					},
					{ email }
				]
			})
			if (exist) {
				throw Error("This username / email is already taken")
			}
			const user = await prisma.createUser({
				username,
				email,
				firstName,
				lastName,
				bio
			})
			if (user) {
				return true
			} else {
				throw Error("that user can't be created")
			}
		}
	}
}
