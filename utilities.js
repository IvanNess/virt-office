import { loadStripe } from "@stripe/stripe-js"
import axios from 'axios'
import { parseISO } from 'date-fns'; 
import moment from 'moment'
import {utcOffset} from './accessories/constants'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

export const packagePay = async ({ auth, hiringChoices, email }) =>{

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

export const reservationPay = async ({auth, selectedDate, startHour, finishHour})=>{
    try {

        const token = await auth.currentUser.getIdToken()

        const stripe = await stripePromise
        console.log(process.env.NEXT_PUBLIC_STRIPE)
        const msDuration = finishHour.msTime - startHour.msTime
        const hours = msDuration / 1000 / 60 / 60
        const response = await axios({
            url: "/api/reservationsession", 
            method: "POST",
            data: {
                token, 
                year: selectedDate.year, 
                month: selectedDate.month, 
                day: selectedDate.day, 
                startHour: startHour, 
                finishHour: finishHour, 
                quantity: hours
            }
        }) 

        const result = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId
        })

    } catch (error) {
        console.log('error', error)
    }
}

export const getData64FromTextImg = text =>{
    const fontSize = 50
    const canvas = document.createElement("canvas");
    canvas.width = 300;
    canvas.height = 300;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle='#4CAED5';
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle='white';
    ctx.font = `${fontSize}px Work Sans Black`;
    ctx.textAlign = "center"
    ctx.textBaseline= "middle"
    const textWidth = ctx.measureText(text).width
    if(textWidth > canvas.width){
        const textArr = text.split(" ")
        textArr.forEach((item, idx, arr)=>{
            const textWidth = ctx.measureText(item).width
            // console.log('canvas mes', textWidth, canvas.width)
            if(textWidth > canvas.width){
                canvas.width = textWidth + fontSize
                ctx.fillStyle='#4CAED5';
                ctx.fillRect(0, 0, textWidth + fontSize , canvas.height);
            }
        })
        textArr.forEach((item, idx, arr)=>{
            ctx.fillStyle='white';
            ctx.textBaseline= "bottom"
            ctx.textAlign = "center"
            ctx.font = `${fontSize}px Work Sans Black`;
            const space = 30
            const length = arr.length
            ctx.fillText(item, canvas.width/2, ((canvas.height-20 - (fontSize*length + space*length))/2) + (fontSize+space)*(idx+1));
        })
        return canvas.toDataURL()
    }
    ctx.fillText(text, canvas.width/2, canvas.height/2);
    return canvas.toDataURL()
}

export const getCurrentDate = ()=>{
    const date = moment().utcOffset(utcOffset)
    console.log('CURRENT DATE', date, date.hours(), date.date(), moment(date).format('YYYY-MM-DD'))
    return date
}

export const przelewyPackagePay = async ({ auth, hiringChoices, email, country="PL", language="pl", router }) =>{

    try {
        const invoiceDate = +new Date()
        const packageDuration = hiringChoices[1].choice==='Miesiąc' ? 30*24*60*60*1000:
            hiringChoices[1].choice==='Kwartał'? 3*30*24*60*60*1000: 365*24*60*60*1000

        const token = await auth.currentUser.getIdToken()
        console.log('auth token', auth, token)
        
        const createPackRes = await axios({
            url: "/api/przelewy-package",
            method: "POST",
            data: {
                token,
                pakietName: hiringChoices[0].choice,
                pakietTitle: hiringChoices[0].pakietTitle,
                hiredPeriod: hiringChoices[1].choice,
                invoiceDate,
                expireDate: invoiceDate + packageDuration,
                price: hiringChoices[1].price,
                fullPrice: hiringChoices[1].fullPrice,
                lengthCoeff: hiringChoices[1].lengthCoeff,
                email,
                country,
                language
            }
        })

        const przelewyToken = createPackRes.data.token

        console.log('przelewyToken', przelewyToken)

        return router.push(`https://sandbox.przelewy24.pl/trnRequest/${przelewyToken}`)

    } catch(err){
        console.log('package pay error', err)
    }
}

export const przelewyUpdatePackagePay = async ({ 
    auth, pakietTitle, pakietName, hiredPeriod, price, fullPrice, lengthCoeff, startDate,
    email, country="PL", language="pl", router
}) =>{

    try {

        const token = await auth.currentUser.getIdToken()
        console.log('auth token', auth, token)
        
        const response = await axios({
            url: "/api/przelewy-package",
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
                email,
                country,
                language
            }
        })
        
        const przelewyToken = response.data.token

        console.log('przelewyToken', przelewyToken)

        return router.push(`https://sandbox.przelewy24.pl/trnRequest/${przelewyToken}`)

    } catch(err){
        console.log('package pay error', err)
    }
}

export const przelewyReservationPay = async ({auth, selectedDate, startHour, finishHour,
    email, country="PL", language="pl", router
})=>{
    try {

        const token = await auth.currentUser.getIdToken()

        const msDuration = finishHour.msTime - startHour.msTime
        const hours = msDuration / 1000 / 60 / 60
        const response = await axios({
            url: "/api/przelewy-reserwation", 
            method: "POST",
            data: {
                token, 
                year: selectedDate.year, 
                month: selectedDate.month, 
                day: selectedDate.day, 
                startHour: startHour, 
                finishHour: finishHour, 
                quantity: hours,
                email, country="PL", language="pl", router
            }
        }) 

        const przelewyToken = response.data.token

        console.log('przelewyToken', przelewyToken)

        return router.push(`https://sandbox.przelewy24.pl/trnRequest/${przelewyToken}`)

    } catch (error) {
        console.log('error', error)
    }
}

export function runMiddleware(req, res, fn) {
    return new Promise((resolve, reject) => {
      fn(req, res, (result) => {
        console.log('cors result', result)

        if (result instanceof Error) {
          return reject(result)
        }
  
        return resolve(result)
      })
    })
}
  
