import React, { useEffect, useState } from 'react'
import styles from '../../styles/Profile.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentUser, editCurrentPackage, setCurrentPackage } from '../../redux/actions'
import { useRef } from 'react'
import axios from 'axios'
import { Modal } from 'antd'

function Profile({auth, db}) {

    const dispatch = useDispatch()

    const currentUser = useSelector(state=>state.currentUser)
    const currentPackage = useSelector(state=>state.currentPackage)

    const [chngBtnPswrdDsbld, setChngBtnPswrdDsbld] = useState(false)

    const passwordRef = useRef(null)
    const repeatRef = useRef(null)

    async function changePassword(e){
        e.preventDefault()
        setChngBtnPswrdDsbld(true)
        console.log('change password', passwordRef.current.value, passwordRef.current)
        const password = passwordRef.current.value
        if(password.length < 6){
            Modal.error({
                content: "Hasło musi mieć co najmniej sześć znaków.",
                maskClosable: true,
                onOk: ()=>{passwordRef.current.focus()},
                onCancel: ()=>{passwordRef.current.focus()}
            });
            setChngBtnPswrdDsbld(false)
            return
        }
        if(password === repeatRef.current.value){
            const token = await auth.currentUser.getIdToken()
            console.log('password', password)
            try {
                const res = await axios({
                    url: "/api/updatepassword",
                    method: "POST",
                    data: {password, token}
                })
                console.log('res', res)
                passwordRef.current.value = '',
                repeatRef.current.value = ''
                Modal.success({
                    content: 'Hasło zostało pomyślnie zmienione!',
                    maskClosable: true
                }); 
            } catch (error) {
                Modal.error({
                    content: error.response.data.message,
                    maskClosable: true,
                    onOk: ()=>{passwordRef.current.focus()},
                    onCancel: ()=>{passwordRef.current.focus()}    
                }); 
            }
            
        } else{
            Modal.error({
                content: "Powtórzone hasło nie jest zgodne z hasłem.",
                maskClosable: true,
                onOk: ()=>{repeatRef.current.focus()},
                onCancel: ()=>{repeatRef.current.focus()}
            });
        }
        setChngBtnPswrdDsbld(false)
    }

    async function getUserData(){  
        try {
            const data = await db.collection('users').where('userId', '==', currentUser.userId).get()
            console.log(data.docs[0].data())
            if(data.docs[0]){
                dispatch(editCurrentUser({...data.docs[0].data(), isFullLoaded: true}))   
                // setForm({...currentUser, ...data.docs[0].data()})         
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getPackageData(){  
        try {
            const data = await db.collection('packages').where('userId', '==', currentUser.userId).get()
            console.log(data.docs[0].data())
            if(data.docs[0]){
                dispatch(setCurrentPackage(data.docs[0].data()))   
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
        if(currentUser!==null && currentUser.isFullLoaded && currentPackage===null){
            getPackageData()
        }
    }, [currentUser])

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
                const usernamesArr = await db.collection('usernames').where('email', '==', currentUser.email).get()
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
        <div className={styles.profile}>
            <ProfileBoilerplate auth={auth} db={db}>
                <div className={styles.title}>1. <span className={styles.bold}>Mój Profil</span></div>
                <div className={styles.text}>
                    <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                </div>

                <form onSubmit={submit}>
                    <input className={styles.login} type="text" placeholder="Login" onChange={(e)=>changeField(e, 'login')}/>
                    <input className={styles.adress} type="text" placeholder="Adres email" disabled={true} onChange={(e)=>changeField(e, 'email')}/>
                    <input className={styles.firm} type="text" placeholder="Nazwa Firmy" onChange={(e)=>changeField(e, 'companyName')}/>
                    <input className={styles.buttonInput} type="submit" value="ZAPISZ"/>
                </form>

                <div className={styles.changeLogin}>
                    <div className={styles.smallTitle}>Zmień hasło:</div>
                    <form onSubmit={changePassword}>
                        <div className={styles.twoColumns}>
                            <input className={styles.password} type="password" placeholder="Nowe Hasło" ref={passwordRef}/>
                            <input className={styles.repeat} type="password" placeholder="Powtórz nowe hasło" ref={repeatRef}/> 
                        </div>
                        <input className={styles.buttonInput} type="submit" value="ZAPISZ" disabled={chngBtnPswrdDsbld}/>
                    </form>
                </div>

            </ProfileBoilerplate>                       
        </div>
    )
}

export default Profile
