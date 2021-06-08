import nodemailer from 'nodemailer'

        // https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/
        // https://www.youtube.com/watch?v=-rcRf7yswfM


const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
        clientId: process.env.OAUTH_CLIENTID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
    }
})

export default transporter