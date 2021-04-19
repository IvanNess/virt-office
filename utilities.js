import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

export const packagePay = async ({ auth, hiringChoices }) =>{

    try {
        const invoiceDate = +new Date()
        const packageDuration = hiringChoices[1].choice==='Miesiąc' ? 30*24*60*60*1000:
            hiringChoices[1].choice==='Kwartał'? 3*30*24*60*60*1000: 365*24*60*60*1000

        const token = await auth.currentUser.getIdToken()
        console.log('auth token', auth, token)

        const stripe = await stripePromise
        console.log(process.env.NEXT_PUBLIC_STRIPE)
        const response = await axios({
            url: "/api/order",
            method: "POST",
            data: {
                token, 
                pakietTitle: hiringChoices[0].pakietTitle,
                hiredPeriod: hiringChoices[1].choice,
                price: hiringChoices[1].fullPrice
            }
        }) 
        console.log('response', response)
        const session = response.data.session;
        console.log('session', session)
        
        await axios({
            url: "/api/createpackage",
            method: "POST",
            data: {
                token,
                pakietName: hiringChoices[0].choice,
                pakietTitle: hiringChoices[0].pakietTitle,
                // cityId: hiringChoices[1].id,
                // hiredOfficeAdress: hiringChoices[1].choice,
                hiredPeriod: hiringChoices[1].choice,
                // fullName: hiringChoices[3].choice.fullName,
                // companyName: hiringChoices[3].choice.companyName,
                // NIP: hiringChoices[3].choice.NIP,
                // contactEmail: hiringChoices[3].choice.contactEmail,
                invoiceDate,
                expireDate: invoiceDate + packageDuration,
                price: hiringChoices[1].price,
                fullPrice: hiringChoices[1].fullPrice,
                lengthCoeff: hiringChoices[1].lengthCoeff,
                sessionId: session.id //stripeSession
            }
        })

        await stripe.redirectToCheckout({
            sessionId: session.id,
        })

    } catch(err){
        console.log('package pay error', err)
    }
}

export const updatePackagePay = async ({ auth, pakietTitle, pakietName, hiredPeriod, price, fullPrice, lengthCoeff, startDate}) =>{

    try {

        const token = await auth.currentUser.getIdToken()
        console.log('auth token', auth, token)

        const stripe = await stripePromise
        console.log(process.env.NEXT_PUBLIC_STRIPE)
        const response = await axios({
            url: "/api/order",
            method: "POST",
            data: {
                token, 
                pakietTitle,
                hiredPeriod,
                price: fullPrice
            }
        }) 
        const session = response.data.session;
        
        await axios({
            url: "/api/createpackage",
            method: "POST",
            data: {
                token,
                pakietName,
                pakietTitle,
                hiredPeriod,
                price,
                fullPrice,
                lengthCoeff,
                startDate,
                sessionId: session.id //stripeSession
            }
        })

        await stripe.redirectToCheckout({
            sessionId: session.id,
        })

    } catch(err){
        console.log('package pay error', err)
    }
}