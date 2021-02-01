import SignInSignUp from "../components/signin-signup";

function SignUp({auth}) {

 
    return (
        <div>
            <SignInSignUp auth={auth} isSignUp={true}/>
        </div>
    )
}

export default SignUp
