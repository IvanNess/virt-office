import axios from 'axios'
import crypto from 'crypto'

export const getPrzelewyToken = async ({sessionId, amount, email, description="test", country="PL", language="pl"})=>{
    // const sessionId = `mySession${Math.floor(Math.random()*1000)}`
    const merchantId = process.env.MERCHANT_ID
    const currency = process.env.CURRENCY
    const crc = process.env.CRC

    var hash = crypto.createHash('sha384');
    //passing the data to be hashed
    const string = `{"sessionId":"${sessionId}","merchantId":${merchantId},"amount":${amount},"currency":"${currency}","crc":"${crc}"}`
    const data = hash.update(string, 'utf-8');
    //Creating the hash in the required format
    const gen_hash = data.digest('hex');
    //Printing the output on the console
    // console.log("hash : " + gen_hash);

    const res = await axios({
        url: 'https://sandbox.przelewy24.pl/api/v1/transaction/register',
        method: 'POST',
        auth:{
            username: merchantId,
            password: "bf3465c3084632def847735459aaaf85"
        },
        data: {
            "merchantId": merchantId,
            "posId": merchantId,
            "sessionId": sessionId,
            "amount": amount,
            "currency": currency,
            "description": description,
            "email": email,
            "country": country,
            "language": language,
            "urlReturn": "http://localhost:3000/konto/rozliczenia",
            "urlStatus": "https://virt-office.vercel.app/api/notification",
            "sign": gen_hash,
            // waitForResult: true
        }
    })

    // console.log('res', res)

    const token = res.data.data.token

    console.log('token', token)

    return token
}
