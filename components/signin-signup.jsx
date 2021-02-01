import {useState} from 'react'
import styles from '../styles/Login.module.scss'
import { TextField, Button } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { setCurrentUser } from '../redux/actions'
import Link from 'next/link'

function SignInSignUp({auth, isSignUp}) {

    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')

    const dispatch = useDispatch()

    const submit = async (e)=>{
        e.preventDefault()
        console.log(name, password, email)
        if(isSignUp){
            try {
                const user = await auth.createUserWithEmailAndPassword(email, password)
                console.log('user', user)
                await user.user.updateProfile({displayName: name})
                dispatch(setCurrentUser({ name, email }))
            } catch (error) {
                console.log('error', error)
            }
        } else{
            try {
                const user = await auth.signInWithEmailAndPassword(email, password)
                console.log('user', user)
                dispatch(setCurrentUser({ name: user.user.displayName, email }))
            } catch (error) {
                console.log('error', error)
            }
        }

    }

    return (
        <div>
            <form className={styles.login} noValidate autoComplete="off" onSubmit={submit}>
                <TextField id="outlined-basic" label="email" variant="standard" onChange={(e)=>setEmail(e.target.value)} />
                {isSignUp && <TextField id="name" label="Name" variant="standard" onChange={(e)=>setName(e.target.value)} />}
                <TextField id="password" label="Password" variant="standard" type="password" onChange={(e)=>setPassword(e.target.value)} />
                <Button type="submit" variant="contained">Sign in</Button>
            </form>
            <Link href='calendar'><a>Calendar</a></Link>
        </div>
    )
}

export default SignInSignUp
