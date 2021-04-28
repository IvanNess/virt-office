import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { Upload } from 'antd'
import { setLogo, editCurrentUser } from '../redux/actions'
import styles from '../styles/Display.module.scss'
import { useRef } from 'react'
// import textToImage from 'text-to-image'

const Display = ({auth, db}) => {

    const currentUser = useSelector(state=>state.currentUser)
    const logo = useSelector(state=>state.logo)
    const [token, setToken] = useState(null)

    const dispatch = useDispatch()

    const [value, setValue] = useState('')
    const [canvas, setCanvas] = useState(null)
    const canvasLogoRef = useRef(null)
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
    }, [auth, currentUser, token])

    useEffect(()=>{
        let canvas = document.createElement("canvas");
        canvas.width = 300;
        canvas.height = 300;
        setCanvas(canvas)
    }, [])

    const submit = (e)=>{
        e.preventDefault()
    }

    const change = async (e)=>{
        const fontSize = 30
        const text = e.target.value
        setValue(text)
        if(text===''){
            return imgRef.current.src = `data:image/png;base64,${logo}`
        }
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
                console.log('canvas mes', textWidth, canvas.width)
                if(textWidth > canvas.width){
                    canvas.width += fontSize
                    ctx.fillStyle='#4CAED5';
                    ctx.fillRect(0, 0, textWidth + fontSize , canvas.height);
                }
            })
            textArr.forEach((item, idx, arr)=>{
                ctx.fillStyle='white';
                ctx.textBaseline= "bottom"
                ctx.textAlign = "center"
                ctx.font = "30px Work Sans Black";
                const space = 20
                const length = arr.length
                ctx.fillText(item, canvas.width/2, ((canvas.height-20 - (fontSize*length + space*length))/2) + (fontSize+space)*(idx+1));
            })
            imgRef.current.src = canvas.toDataURL()
            return
        }
        ctx.fillText(text, canvas.width/2, canvas.height/2);
        imgRef.current.src = canvas.toDataURL()

    }

    async function beforeUpload(file){
        console.log('before upload', file)
        let reader = new FileReader();
        console.log('reader', reader)
        reader.readAsDataURL(file)
        reader.onload = function() {
            console.log('reader', onload)
            const result = reader.result;
            console.log('result', result)
            imgRef.current.src = result
        }
    }    

    return (
        <div className={styles.display}>
            {logo !== null ? <Upload
                name="avatar"
                listType="picture-card"
                className={styles.avatarUploader}
                showUploadList={false}
                // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                beforeUpload={beforeUpload}
                // onChange={logoChanged}
            >
                {logo ? 
                    <img src={`data:image/png;base64,${logo}`} alt="avatar" className={styles.editLogo} ref={imgRef} className={styles.editLogo}/> :
                    'Loading...'
                }
            </Upload> : 'Loading...'}
            <form onSubmit={submit}>
                <input value={value} placeholder="Twoja fraza" onChange={change}/>
            </form>
        </div>
    )
}

export default Display