import SignInSignUp from "../components/signin-signup";

function LogIn({auth}) {

 
    return (
        <div>
            <SignInSignUp auth={auth} isSignUp={false}/>
        </div>
    )
}

export default LogIn
