import React from 'react'
import { useSelector } from 'react-redux'
import styles from '../../styles/Price.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'

import { loadStripe } from "@stripe/stripe-js";
import axios from 'axios'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE);

function Price({auth, db}) {

    const hiringChoices = useSelector(state=>state.hiringChoices)
    const currentUser = useSelector(state=>state.currentUser)

    const router = useRouter()

    const [btnDisabled, setBtnDisabled] = useState(false)
    const [price, setPrice] = useState(1500)

    async function pay(){
        console.log('pay')
        setBtnDisabled(true)  
        try {
            const invoiceDate = +new Date()
            const packageDuration = hiringChoices[2].choice==='Dzień' ? 24*60*60*1000:
                hiringChoices[2].choice==='Miesiąc'? 30*24*60*60*1000: 365*24*60*60*1000

            const stripe = await stripePromise
            console.log(process.env.NEXT_PUBLIC_STRIPE)
            const response = await fetch("/api/order", {
                method: "POST",
            }) 
            console.log('response', response)
            const session = await response.json();
            console.log('session', session)

            const token = await auth.currentUser.getIdToken()
            
            await axios({
                url: "/api/createpackage",
                method: "POST",
                data: {
                    token,
                    pakietName: hiringChoices[0].choice,
                    cityId: hiringChoices[1].id,
                    hiredOfficeAdress: hiringChoices[1].choice,
                    hiredPeriod: hiringChoices[2].choice,
                    fullName: hiringChoices[3].choice.fullName,
                    companyName: hiringChoices[3].choice.companyName,
                    NIP: hiringChoices[3].choice.NIP,
                    contactEmail: hiringChoices[3].choice.contactEmail,
                    invoiceDate,
                    expireDate: invoiceDate + packageDuration,
                    price,
                    sessionId: session.session.id //stripeSession
                }
            })

            // await db.collection('packages').add({
            //     isPaid: false,
            //     userId: currentUser?.userId || false,
            //     pakietName: hiringChoices[0].choice,
            //     cityId: hiringChoices[1].id,
            //     hiredOfficeAdress: hiringChoices[1].choice,
            //     hiredPeriod: hiringChoices[2].choice,
            //     fullName: hiringChoices[3].choice.fullName,
            //     companyName: hiringChoices[3].choice.companyName,
            //     NIP: hiringChoices[3].choice.NIP,
            //     contactEmail: hiringChoices[3].choice.contactEmail,
            //     payDate: +new Date(),
            //     invoiceDate,
            //     expireDate: invoiceDate + packageDuration,
            //     price,
            //     sessionId: session.session.id //stripeSession
            // })

            //auth
            // console.log('auth', auth.currentUser)

            const result = await stripe.redirectToCheckout({
                sessionId: session.session.id,
            })

            console.log('It should havent been seen')

            if (result.error) {
            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
            console.log('error', result.error.message)
            }

            setBtnDisabled(false)
            router.push('/')
        } catch (error) {
            console.log(error)
            setBtnDisabled(false)
        }
    }

    return (
        <div className={styles.price}>
            {/* <Head>
                <script src='https://js.stripe.com/v3'></script>
            </Head> */}
            { 
                hiringChoices[0].isComplete && hiringChoices[2].isComplete &&
                <div className={styles.wrapper}>
                    <div className={styles.title}>Cena:&nbsp;</div>
                    <div className={styles.value}>{price}</div>
                </div>
            }
            {
                hiringChoices[0].isComplete && hiringChoices[2].isComplete &&
                hiringChoices[1].isComplete && hiringChoices[3].isComplete &&
                <button className={styles.priceButton} onClick={!btnDisabled? pay: ()=>{}} disabled={btnDisabled}>ZAPŁAĆ</button>
            }
        </div>
    )
}

export default Price
