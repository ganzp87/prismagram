import { adjectives, nouns } from "./words"
import nodeMailer from "nodemailer"
import mn from "nodemailer-mailgun-transport"
import jwt from "jsonwebtoken"

export const generateSecret = () => {
	const randomNumber_1 = Math.floor(Math.random() * adjectives.length)
	const randomNumber_2 = Math.floor(Math.random() * adjectives.length)
	return `${adjectives[randomNumber_1]} ${nouns[randomNumber_2]}`
}

const sendMail = (email) => {
	const options = {
		auth: {
			api_key: process.env.MAILGUN_API,
			domain: process.env.MAILGUN_DOMAIN
		}
	}
	const client = nodeMailer.createTransport(mn(options))
	return client.sendMail(email)
}

export const sendSecretMail = (address, secret) => {
	const email = {
		from: "admin@prismagram.co",
		to: address,
		subject: "🔒Login Secret for Prismagram🔒",
		html: `Here is login secret <strong>${secret}</strong> <br/> Please copy and paste this secret to the App!`
	}
	return sendMail(email)
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET)
