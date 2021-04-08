import React, { useState, useEffect } from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentUser } from '../../redux/actions'
import axios from 'axios'

function Dane({auth, db}) {

    const ReadyField = ({title, value})=>(
        <div className={styles.readyField}>
            <div className={styles.title}>{title}</div>
            &nbsp;
            <div className={styles.value}>{value}</div>
        </div>
    )
    
    const [isEditMode, setIsEditMode] = useState(false)

    const dispatch = useDispatch()

    const currentUser = useSelector(state=>state.currentUser)

    useEffect(()=>{
        console.log('profile auth', auth)
    }, [auth])

    async function getUserData(){  
        try {
            // const data = await db.collection('users').where('userId', '==', currentUser.userId).get()
            // console.log(data.docs[0].data())
            // if(data.docs[0]){
            //     dispatch(editCurrentUser({...data.docs[0].data(), isFullLoaded: true}))   
            //     setForm({...currentUser, ...data.docs[0].data()})         
            // }
            const token = await auth.currentUser.getIdToken()
            const response = await axios({
                url: "/api/getuser",
                method: "POST",
                data: {token}
            })
            if(response.data.user){
                dispatch(editCurrentUser({...response.data.user, isFullLoaded: true}))   
                setForm({...currentUser, ...response.data.user})         
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

    function edit(){
        setIsEditMode(true)
    }

    function changeField(e, fieldName){
        console.log(e.target.value)
        setForm({...form, [fieldName]: e.target.value})
    }

    const [form, setForm] = useState({})

    async function submit(e){
        e.preventDefault()
        console.log('form', form)
        try {
            const arr = await db.collection('users').where('userId', '==', currentUser.userId).get()
            const user = arr.docs[0]
            const userId = user.id
            console.log('userId', userId)
            if(form.name !== currentUser.name){
                console.log('change username')
                const userRef = db.collection('users').doc(userId)
                const usernamesArr = await db.collection('usernames').where('userId', '==', currentUser.userId).get()
                const username = usernamesArr.docs[0]
                const usernameId = username.id
                console.log('usernameId', usernameId)
                const usernameRef = db.collection('usernames').doc(usernameId)
                const batch = db.batch()
                batch.update(userRef, form)
                batch.update(usernameRef, {name: form.name})
                await batch.commit();
            }else{
                await db.collection('users').doc(userId).update(form)
            }
            dispatch(editCurrentUser(form))
            setIsEditMode(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={styles.dane}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div>
                    <div className={styles.title}>2. <span className={styles.bold}>Moje dane</span></div>
                    <div className={styles.text}>
                        <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                    </div>

                    {!isEditMode ? 
                        <div className={styles.noEdit}>
                            <div className={styles.noEditFields}>
                                <div className={styles.left}>
                                    <ReadyField title='Login:' value={currentUser?.name}/>
                                    <ReadyField title='Adres email:' value={currentUser?.email}/>
                                    <ReadyField title='Nazwa Firmy:' value={currentUser?.companyName}/>
                                    <ReadyField title='Imię i Nazwisko:' value={currentUser?.fullName}/>
                                </div>
                                <div className={styles.right}>
                                    <ReadyField title='Nazwa Firmy:' value={currentUser?.companyName}/>
                                    <ReadyField title='NIP:' value={currentUser?.NIP}/>
                                    <ReadyField title='Adres email osoby kontaktowej:' value={currentUser?.contactEmail}/>
                                    <ReadyField title='Adres:' value={currentUser?.adress}/>
                                </div>
                            </div>
                            <button className={styles.editButton} onClick={edit}>EDYTUJ</button>
                        </div>
                    :
                    <div className={styles.edit}>
                        <form onSubmit={submit}>
                            <input className={styles.login} type="text" placeholder="Login" value={form?.name} onChange={(e)=>changeField(e, 'name')}/>
                            <input className={styles.adress} type="text" placeholder="Adres email" value={form?.email} disabled={true}/>
                            <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value={form?.companyName} onChange={(e)=>changeField(e, 'companyName')}/>
                            <input className={styles.name} type="text" placeholder="Imię i Nazwisko" value={form?.fullName} onChange={(e)=>changeField(e, 'fullName')}/>
                            <div className={styles.twoColumns}>
                                <input className={styles.login} type="text" placeholder="Login" value={form?.name} onChange={(e)=>changeField(e, 'name')}/>
                                <input className={styles.adress} type="text" placeholder="Adres email" value={form?.email} disabled={true}/>
                            </div>
                            <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value={form?.companyName} onChange={(e)=>changeField(e, 'companyName')}/>
                            <div className={styles.twoColumns}>
                                <input className={styles.login} type="text" placeholder="NIP" value={form?.NIP} onChange={(e)=>changeField(e, 'NIP')}/>
                                <input className={styles.adress} type="text" placeholder="Adres email do korespondencji" value={form?.contactEmail} onChange={(e)=>changeField(e, 'contactEmail')}/>
                            </div>
                            <input className={styles.buttonInput} type="submit" value="ZAPISZ"/>
                        </form>
                    </div>}
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Dane
