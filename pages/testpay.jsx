import React, {useEffect} from 'react'
import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

const TestPay = () => {

    useEffect(()=>{
        asyncPayment()
        async function asyncPayment(){
            const response = await axios({
                url: "/api/testpay",
                method: "POST",
                // data: {
                //     token, 
                //     pakietTitle: hiringChoices[0].pakietTitle,
                //     hiredPeriod: hiringChoices[1].choice,
                //     price: hiringChoices[1].fullPrice
                // }
            }) 
            console.log('response', response)
            const sessionId = response.data.sessionId

            const stripe = await stripePromise

            await stripe.redirectToCheckout({sessionId})
        }
        

    }, [])

    return (
        <div>
            Test Pay
        </div>
    )
}

export default TestPay
