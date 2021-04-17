import React, { useState, useEffect } from 'react'
import styles from '../../styles/Dane.module.scss'

import ProfileBoilerplate from '../../components/profile-boilerplate'
import { useDispatch, useSelector } from 'react-redux'
import { editCurrentUser } from '../../redux/actions'
import axios from 'axios'
import { Popover, Tooltip, Skeleton } from 'antd'
import { useRef } from 'react'
import ChangePassword from '../../components/change-password'

import 'react-phone-number-input/style.css'
import PhoneInput, {isPossiblePhoneNumber} from 'react-phone-number-input'
import pl from 'react-phone-number-input/locale/pl'

import flags from '../../accessories/flags'

function Dane({auth, db}) {

    const ReadyField = ({title, value, skeleton})=>(
        <div className={styles.readyField}>
            <div className={styles.title}>{title}</div>
            &nbsp;
            {
                value || (currentUser && currentUser.isFullLoaded) ?
                <div className={styles.value}>{value}</div> :
                skeleton
            }
        </div>
    )

    const skeletonBtn =  <Skeleton.Button active={true} size="small"/>
    const skeletonAvtr = <Skeleton.Avatar active={true} size="small"/>
    const skeletonInput = <Skeleton.Input style={{ width: 200 }} active={true} size="small" />
    
    const [isEditMode, setIsEditMode] = useState(false)
    const [isZapiszDiasabled, setIsZapiszDiasabled] = useState(false)
    const [form, setForm] = useState({init: true})
    const [token, setToken] = useState(null)

    const dispatch = useDispatch()

    const currentUser = useSelector(state=>state.currentUser)

    const loginRef = useRef(null)
    const companyNameRef = useRef(null)
    const fullNameRef = useRef(null)
    const NIPRef = useRef(null)
    const emailRef = useRef(null)
    const phoneRef = useRef(null)

    useEffect(()=>{
        console.log('profil use effect auth currentUser', auth, currentUser)
        async function getToken(){
            const token = await auth.currentUser.getIdToken()
            setToken(token)
        }
        if(currentUser && auth){
            getToken()
        }
    }, [auth, currentUser])

    async function getUserData(){  
        try {
            // const data = await db.collection('users').where('userId', '==', currentUser.userId).get()
            // console.log(data.docs[0].data())
            // if(data.docs[0]){
            //     dispatch(editCurrentUser({...data.docs[0].data(), isFullLoaded: true}))   
            //     setForm({...currentUser, ...data.docs[0].data()})         
            // }
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
        if(currentUser!==null && currentUser && !currentUser.isFullLoaded && token){
            getUserData()
        }
        if(currentUser!==null && currentUser && currentUser.isFullLoaded && token && form.init){
            setForm({...currentUser})         
        }
    }, [currentUser, token, form])

    function edit(){
        if(!currentUser.isFullLoaded)
            return
        setIsEditMode(true)
    }

    function changeField(e, fieldName){
        console.log(e.target.value)
        setForm({...form, [fieldName]: e.target.value, [`${fieldName}Error`]: null})
    }

    async function submit(e){
        e.preventDefault()
        console.log('form', form)
        setIsZapiszDiasabled(true)
        if(form.username.trim()===''){
            setForm(form=>({...form, usernameError : 'Pole wymagane'}))
            setIsZapiszDiasabled(false)
            loginRef.current.focus()
            return
        }
        if(form.fullName.trim()===''){
            setForm(form=>({...form, fullNameError : 'Pole wymagane'}))
            setIsZapiszDiasabled(false)
            fullNameRef.current.focus()
            return
        }
        if(form.contactPhone && !isPossiblePhoneNumber(form.contactPhone)){
            setForm(form=>({...form, phoneError : 'Nie wygląda jak prawdziwy numer telefonu.'}))
            setIsZapiszDiasabled(false)
            phoneRef.current.focus()
            return
        }
        if((form.email+'').trim().length ===0 || !form.email.includes('@')){
            setForm(form=>({...form, emailError : 'Nie wygląda jak prawdziwy e-mail.'}))
            setIsZapiszDiasabled(false)
            emailRef.current.focus()
            return
        }
        if(form.companyName.trim()===''){
            setForm(form=>({...form, companyNameError : 'Pole wymagane'}))
            setIsZapiszDiasabled(false)
            companyNameRef.current.focus()
            return
        }
        const NIP = form.NIP ? form.NIP+''.trim() : ''
        if(NIP.length !==0 && (NIP.length !==10 || !Number(NIP))){
            setForm(form=>({...form, NIPError : 'Nie wygląda jak numer NIP.'}))
            setIsZapiszDiasabled(false)
            NIPRef.current.focus()
            return
        }
        try {
            // const arr = await db.collection('users').where('userId', '==', currentUser.userId).get()
            // const user = arr.docs[0]
            // const userId = user.id
            // console.log('userId', userId)
            // if(form.name !== currentUser.name){
            //     console.log('change username')
            //     const userRef = db.collection('users').doc(userId)
            //     const usernamesArr = await db.collection('usernames').where('userId', '==', currentUser.userId).get()
            //     const username = usernamesArr.docs[0]
            //     const usernameId = username.id
            //     console.log('usernameId', usernameId)
            //     const usernameRef = db.collection('usernames').doc(usernameId)
            //     const batch = db.batch()
            //     batch.update(userRef, form)
            //     batch.update(usernameRef, {name: form.name})
            //     await batch.commit();
            // }else{
            //     await db.collection('users').doc(userId).update(form)
            // }

            const response = await axios({
                url: "/api/updateuser",
                method: "POST",
                data: {token, data: {
                    NIP,
                    companyName: form.companyName.trim(),
                    contactEmail: form.contactEmail.trim(),
                    contactPhone: form.contactPhone || '',
                    fullName: form.fullName.trim(),
                    username: form.username.trim(),
                    adress: form.adress?.trim() || ''
                }}
            })
            dispatch(editCurrentUser(form))
            setIsEditMode(false)
            setIsZapiszDiasabled(false)
            setForm(form=>({...form, usernameError: null}))
        } catch (error) {
            console.log(error)
            if(error.response?.data==="this name is not available."){
                setForm(form=>({...form, usernameError: "this name is not available."}))
                loginRef.current.focus()
            }
            setIsZapiszDiasabled(false)
        }
    }

    function onFocus(name){
        const names = ['username', 'fullName', 'adress', 'NIP', 'companyName', 'phone']
        names.forEach(item=>{
            if(item !== name){
                setForm(form=>({...form, [`${item}Error`]: null}))
            }
        })
    }

    function cancel(){
        setIsEditMode(false)
        setForm({...currentUser})         
    }

    function changePhoneNumber(value){
        console.log('phone code value', value)
        setForm({...form, contactPhone: value, phoneError: null})
    }

    return (
        <div className={styles.dane}>
            <ProfileBoilerplate  auth={auth} db={db}>
                <div>
                    <div className={styles.title}>1. <span className={styles.bold}>Mój Profil</span></div>
                    {/* <div className={styles.text}>
                        <div className={styles.small}>Wpisz nazwę lub kod pocztowy miasta, w którym chcesz wybrać adres firmy. Dostępne adresy i miesięczny koszt wyświetlą się poniżej.</div>
                    </div> */}

                    {!isEditMode ? 
                        <div className={styles.noEdit}>
                            <div className={styles.noEditFields}>
                                <div className={styles.left}>
                                    <ReadyField title='Login:' value={currentUser?.username} skeleton={skeletonBtn}/>
                                    <ReadyField title='Adres email:' value={currentUser?.email} skeleton={skeletonBtn}/>
                                    <ReadyField title='Nazwa Firmy:' value={currentUser?.companyName} skeleton={skeletonBtn}/>
                                    <ReadyField title='Imię i Nazwisko:' value={currentUser?.fullName} skeleton={skeletonBtn}/>
                                </div>
                                <div className={styles.right}>
                                    <ReadyField title='Nazwa Firmy:' value={currentUser?.companyName} skeleton={skeletonInput}/>
                                    <ReadyField title='NIP:' value={currentUser?.NIP} skeleton={skeletonBtn}/>
                                    <ReadyField title='Adres email osoby kontaktowej:' value={currentUser?.contactEmail} skeleton={skeletonBtn}/>
                                    <ReadyField title='Adres:' value={currentUser?.adress} skeleton={skeletonInput}/>
                                </div>
                            </div>
                            <div className={styles.editBtnWrapper}>
                                <button className={styles.editButton} onClick={edit} disabled={!currentUser?.isFullLoaded}>EDYTUJ</button>
                            </div>
                            <ChangePassword auth={auth}/>
                        </div>
                    :
                    <div className={styles.edit}>
                        <form onSubmit={submit}>
                            <Tooltip title="Login" placement="left" trigger={['focus', 'hover']} color="#121109" mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.usernameError} 
                                color={"red"} placement="bottomLeft" visible={form.usernameError}
                            >
                                <input 
                                    className={styles.login} type="text" placeholder="Login" ref={loginRef}
                                    value={form?.username} onChange={(e)=>changeField(e, 'username')}
                                    onFocus={(e)=>onFocus('username')}
                                />
                            </Tooltip></Tooltip>

                            {/* <Popover content="Adres email" placement="topLeft">
                                <input className={styles.adress} type="text" placeholder="Adres email" value={form?.email} disabled={true}/>
                            </Popover> */}

                            <Tooltip title="Imię i Nazwisko" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.fullNameError} color={"red"} placement="bottomLeft" visible={form.fullNameError}>
                                <input className={styles.name} type="text" placeholder="Imię i Nazwisko" 
                                    value={form?.fullName} onChange={(e)=>changeField(e, 'fullName')}
                                    onFocus={(e)=>onFocus('fullName')} ref={fullNameRef}
                                />
                            </Tooltip></Tooltip>

                            <Tooltip title="Telefon" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.phoneError} color={"red"} placement="bottomLeft" visible={form.phoneError}>
                                <PhoneInput 
                                    placeholder="Telefon" 
                                    defaultCountry="PL"
                                    labels={pl}
                                    international={true}
                                    countryCallingCodeEditable={true}
                                    value={form?.contactPhone || null} 
                                    onChange={changePhoneNumber}
                                    flags={flags}
                                    countryOptionsOrder={["PL", "RU", "UA", "BY", "|", "..."]}
                                    ref={phoneRef}
                                />
                            </Tooltip></Tooltip>

                            <Tooltip title="E-mail" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.emailError} color={"red"} placement="bottomLeft" visible={form.emailError}>
                                <input className={styles.name} type="text" placeholder="E-mail" 
                                    value={form?.email} onChange={(e)=>changeField(e, 'email')}
                                    onFocus={(e)=>onFocus('email')} ref={emailRef}
                                />
                            </Tooltip></Tooltip>

                            <Tooltip title="Adres" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.adressError} color={"red"} placement="bottomLeft" visible={form.adressError}>
                                <input className={styles.name} type="text" placeholder="Adres" 
                                    value={form?.adress} onChange={(e)=>changeField(e, 'adress')}
                                    onFocus={(e)=>onFocus('adress')}
                                />
                            </Tooltip></Tooltip>

                            <Tooltip title="Nazwa Firmy" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.companyNameError} color={"red"} placement="bottomLeft" visible={form.companyNameError}>
                                <input className={styles.firm} type="text" placeholder="Nazwa Firmy" ref={companyNameRef}
                                    value={form?.companyName} onChange={(e)=>changeField(e, 'companyName')}
                                    onFocus={(e)=>onFocus('companyName')}
                                />
                            </Tooltip></Tooltip>

                            {/* <div className={styles.twoColumns}>
                                <Tooltip title="Nazwa Firmy" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                                <Tooltip title={form.companyNameError} color={"red"} placement="topLeft" visible={form.fullNameError}>
                                    <input className={styles.login} type="text" placeholder="Login" value={form?.username} onChange={(e)=>changeField(e, 'name')}/>
                                </Tooltip></Tooltip>
                                <input className={styles.adress} type="text" placeholder="Adres email" value={form?.email} disabled={true}/>
                            </div> */}

                            {/* <Tooltip title="Nazwa Firmy" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                            <Tooltip title={form.companyNameError} color={"red"} placement="topLeft" visible={form.fullNameError}>
                                <input className={styles.firm} type="text" placeholder="Nazwa Firmy" value={form?.companyName} onChange={(e)=>changeField(e, 'companyName')}/>
                            </Tooltip></Tooltip> */}

                            <div className={styles.twoColumns}>
                                <Tooltip title="NIP" placement="left" trigger={['focus', 'hover']} color="#121109"  mouseEnterDelay={0} mouseLeaveDelay={0}>
                                <Tooltip title={form.NIPError} color={"red"} placement="bottomLeft" visible={form.NIPError}>
                                    <input className={styles.login} type="text" placeholder="NIP" 
                                        value={form?.NIP} onChange={(e)=>changeField(e, 'NIP')}
                                        onFocus={(e)=>onFocus('NIP')} ref={NIPRef}
                                    />
                                </Tooltip></Tooltip>
                                {/* <input className={styles.adress} type="text" placeholder="Adres email do korespondencji" value={form?.contactEmail} onChange={(e)=>changeField(e, 'contactEmail')}/> */}
                                <input className={styles.buttonInput} type="submit" value="ZAPISZ" disabled={isZapiszDiasabled}/>
                                <div className={styles.cancelBtn} onClick={cancel}>odwołania</div>
                            </div>
                            
                            {/* <input className={styles.buttonInput} type="submit" value="ZAPISZ" disabled={isZapiszDiasabled}/> */}
                        </form>
                    </div>}
                </div>
            </ProfileBoilerplate>       
        </div>
    )
}

export default Dane
