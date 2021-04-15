import React, { useState } from 'react'
import styles from '../styles/Profile.module.scss'
import { useRef } from 'react'
import axios from 'axios'
import { Modal } from 'antd'

function ChangePassword({auth}) {

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

    return (
        <div className={styles.profile}>
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
        </div>
    )
}

export default ChangePassword
