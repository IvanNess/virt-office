import React, { useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import crypto from 'crypto'

const PrzelewyTest = () => {

    const router = useRouter()

    const click = async()=>{

        // const sessionId = `mySession${Math.floor(Math.random()*1000)}`
        const sessionId = 'mySession7523'
        const merchantId = 146162
        const amount = 1
        const currency = "PLN"
        const crc = "6fdc92eec6bce090"
        console.log('sessionid', sessionId)

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
                "description": "test order",
                "email": "john.doe@example.com",
                "country": "PL",
                "language": "pl",
                "urlReturn": "http://localhost:3000/konto/rozliczenia",
                "urlStatus": "https://virt-office.vercel.app/api/notification",

                "sign": gen_hash,
            }
        })

        console.log('res', res)

        const token = res.data.data.token

        console.log('token', token)

        router.push(`https://sandbox.przelewy24.pl/trnRequest/${token}`)

    }

    return (
        <div>
            <button onClick={click}>click</button>
        </div>
    )
}

export default PrzelewyTest
