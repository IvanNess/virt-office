import React, { useEffect } from 'react'
import styles from '../../styles/WynajecieForm.module.scss'
import { useSelector, useDispatch } from 'react-redux'
import { setWynajecieFormProp, setWynajecieForm, editCurrentUser, updateHiringChoice, setHiringChoiceNumber } from '../../redux/actions'

function WynajecieForm({auth, db}) {

    function submit(e){
        e.preventDefault()
        if(!wynajecieForm.fullName || wynajecieForm.fullName.length === 0){
            dispatch(setWynajecieFormProp('fullNamePlaceholder', 'There is no empty string allowed'))
            return
        }
        if(!wynajecieForm.companyName || wynajecieForm.companyName.length === 0){
            dispatch(setWynajecieFormProp('companyNamePlaceholder', 'There is no empty string allowed'))
            return
        }
        if(!wynajecieForm.NIP || wynajecieForm.NIP.length !== 10 || !Number(wynajecieForm.NIP)){
            dispatch(setWynajecieFormProp('NIP', ''))
            dispatch(setWynajecieFormProp('NIPplaceholder', 'There should be 10 digits in NIP'))
            return
        }
        if(!wynajecieForm.contactEmail || wynajecieForm.contactEmail.length === 0){
            dispatch(setWynajecieFormProp('contactEmailPlaceholder', 'There is no empty string allowed'))
            return
        }
        if(!wynajecieForm.contactEmail.includes("@")){
            dispatch(setWynajecieFormProp('contactEmail', ''))
            dispatch(setWynajecieFormProp('contactEmailPlaceholder', 'It does not look like email adress'))
            return
        }
        dispatch(setWynajecieFormProp("isSubmited", true))
        dispatch(updateHiringChoice({number: hiringChoiceNumber, value: true, prop: "isComplete"}))
        dispatch(updateHiringChoice({prop: "choice", value: {
            fullName: wynajecieForm.fullName,
            companyName: wynajecieForm.companyName,
            NIP: wynajecieForm.NIP,
            contactEmail: wynajecieForm.contactEmail
        }, number: 4}))
        dispatch(setHiringChoiceNumber(hiringChoiceNumber+1))
    }

    const dispatch = useDispatch()

    const wynajecieForm = useSelector(state=>state.wynajecieForm)
    const currentUser = useSelector(state=>state.currentUser)
    const hiringChoiceNumber = useSelector(state=>state.hiringChoiceNumber)

    function change(e, prop){
        dispatch(setWynajecieFormProp(prop, e.target.value))
    }

    async function getUserData(){  
        try {
            const data = await db.collection('users').where('email', '==', currentUser.email).get()
            console.log(data.docs[0].data())
            if(data.docs[0]){
                dispatch(editCurrentUser({...data.docs[0].data(), isFullLoaded: true}))   
                dispatch(setWynajecieForm({...data.docs[0].data(), isSubmited: false}))
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        console.log('current user', currentUser)
        if(currentUser!==null && !currentUser.isFullLoaded){
            getUserData()
        }

    }, [currentUser])


    return (
        <div className={styles.wynajecieForm}>
            <div className={styles.title}>
                4. Wpisz <span className={styles.boldFont}>dane <br/> do umowy</span> 
            </div>
            <div className={styles.description}>
                Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.
            </div>
            <form onSubmit={submit} className={styles.form}>
                <input type="text" onChange={(e)=>change(e, "fullName")} value={wynajecieForm.fullName} placeholder={wynajecieForm.fullNamePlaceholder ?? "Imię i Nazwisko"}/>
                <div className={styles.contact}>osoba kontaktowa</div>
                <input type="text" onChange={(e)=>change(e, "companyName")} value={wynajecieForm.companyName} placeholder={wynajecieForm.companyNamePlaceholder ?? "Nazwa Firmy"}/>
                <div className={styles.twoInputs}>
                    <input className={styles.left} type="text" onChange={(e)=>change(e, "NIP")} value={wynajecieForm.NIP} placeholder={wynajecieForm.NIPplaceholder ?? "NIP"}/>
                    <input className={styles.right} type="text" onChange={(e)=>change(e, "contactEmail")} value={wynajecieForm.contactEmail} placeholder={wynajecieForm.contactEmailPlaceholder ?? "Adres email do korespondencji"}/>
                </div>
                <input className={styles.button} type="submit" value="Dalej"/> 
            </form>
        </div>
    )
}

export default WynajecieForm
