import { generateSecret, sendSecretMail } from "./../../../utils"
import { prisma } from "./../../../../generated/prisma-client"

export default {
	Mutation: {
		requestSecret: async (_, args, { request }) => {
			const { email } = args
			const loginSecret = generateSecret()
			try {
				console.log(request.user)
				await prisma.updateUser({
					data: { loginSecret },
					where: { email }
				})
				await sendSecretMail(email, loginSecret)
				return true
			} catch (error) {
				console.log(error.message)
				return false
			}
		}
	}
}
