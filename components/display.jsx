import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Upload, Skeleton, Modal } from 'antd'
import { setLogo, editCurrentUser } from '../redux/actions'
import styles from '../styles/Display.module.scss'
import { useRef } from 'react'
import SkeletonImage from 'antd/lib/skeleton/Image'
import { getData64FromTextImg } from '../utilities'
import { phrases, buttonNames } from '../accessories/constants'
import DisplayDescription from './display-description'
// import textToImage from 'text-to-image'

const Display = ({auth, db}) => {

    const currentUser = useSelector(state=>state.currentUser)
    const logo = useSelector(state=>state.logo)
    const language = useSelector(state=>state.language)
    const [token, setToken] = useState(null)
    const [btnDisabled, setBtnDisabled] = useState(true)

    const dispatch = useDispatch()

    const [value, setValue] = useState('')
    const imgRef = useRef(null)

    useEffect(()=>{
        if(currentUser && auth && !token){
            getToken()
        }
        if(currentUser!==null && currentUser && !currentUser.isFullLoaded && token){
            getUserData()
        }
        if(!logo && currentUser!==null && currentUser && currentUser.isFullLoaded && token){
            getLogo()
        }
        async function getToken(){
            const token = await auth.currentUser.getIdToken()
            setToken(token)
        }
        async function getLogo(){
            const resp = await axios({
                url: '/api/getlogo',
                method: "POST",
                data:{ postgresId: currentUser.postgresId, token }
            })
            console.log('logo resp', resp)
            dispatch(setLogo(resp.data.innerLogo))
        }
        async function getUserData(){  
            try {
                const response = await axios({
                    url: "/api/getuser",
                    method: "POST",
                    data: {token}
                })
                console.log('user data response', response)
                if(response.data.user){
                    dispatch(editCurrentUser({...response.data.user, isFullLoaded: true}))            
                }
            } catch (error) {
                console.log(error)
            }
        }
    }, [auth, currentUser, token, logo])

    // useEffect(()=>{
    //     let canvas = document.createElement("canvas");
    //     canvas.width = 300;
    //     canvas.height = 300;
    //     setCanvas(canvas)
    // }, [])

    const submit = async (e)=>{
        e.preventDefault()
        console.log('submit')
        setBtnDisabled(true)
        const imgRefUrl = imgRef.current.src
        const data = imgRefUrl.replace("data:", "").replace(/^.+,/, "").replaceAll("%0A", "")
        // console.log('data', data)
        try {
            // console.log('submit', token, data)
            await axios({
                url: "/api/updatelogo",
                method: "POST",
                data: {token , data}
            })
            dispatch(setLogo(data))
        } catch (error) {
            // console.log('error', error)
            Modal.error({
                title: 'This is an error message',
                content: error.response.data.message,
            })
        }
        // setBtnDisabled(false)
    }

    const change = async (e)=>{
        setBtnDisabled(false)
        const text = e.target.value
        setValue(text)
        if(text===''){
            return imgRef.current.src = `data:image/png;base64,${logo}`
        }
        imgRef.current.src = getData64FromTextImg(text)
    }

    async function beforeUpload(file){
        console.log('before upload', file)
        setBtnDisabled(false)
        let reader = new FileReader();
        console.log('reader', reader)
        reader.readAsDataURL(file)
        reader.onload = function() {
            // console.log('reader', onload)
            const result = reader.result;
            // console.log('result', result)
            imgRef.current.src = result
        }
    }    

    return (
        <div className={styles.display}>
            <div className={styles.title}>{phrases[language]?.yourDisplay}</div>
            <DisplayDescription/>
            {logo !== null ? <Upload
                name="avatar"
                listType="picture-card"
                className={styles.avatarUploader}
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                // onChange={logoChanged}
            >   
                <img src={`data:image/png;base64,${logo}`} alt="avatar" className={styles.editLogo} ref={imgRef} className={styles.editLogo}/> 
            </Upload> : <SkeletonImage style={{width: '200px', height: '200px'}}/>}
            <div className={styles.altDescription}>{phrases[language]?.displayText}</div>
            <form className={styles.displayForm} onSubmit={submit}>
                <input value={value} placeholder={phrases[language]?.yourPhrase} onChange={change}/>
                <input className={styles.buttonInput} type="submit" value={buttonNames[language]?.save} disabled={btnDisabled}/>
            </form>
        </div>
    )
}

export default Display