import { useState } from "react"
import { auth } from "../firebase"
import { signInWithEmailAndPassword } from "firebase/auth"

import { useDispatch } from "react-redux"
import { login } from "../slices/userSlice"
import Router from "next/router"


export default function LoginForm() {

    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')

    const [incorrectLogin, setIncorrectLogin] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = (e) =>{
        e.preventDefault()
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) =>{
                const user = userCredential.user;  
                dispatch(login({
                    email: user.email
                }))
                
            }).then(()=>{
                Router.push('/')
            }).catch(error => {
                setIncorrectLogin(true)
            })
    }

    return(
        <div className="bg-blue-300 mx-auto my-10 max-w-md rounded-2xl border ">
            <form className="flex flex-col mx-4  ">
                <h1 className="text-gray-800 font-semibold text-center text-3xl my-5">Login form</h1>
                <label>Email:</label>
                <input onChange={ e => setEmail(e.target.value)} value={email} className="max-w-md my-2 px-2 py-3 border-none outline-none rounded-xl" type="email" name="email" id="" />

                <label>Password</label>
                <input onChange={ e => setPassword(e.target.value)} value={password} className=" max-w-md my-2 px-2 py-3 border-none outline-none rounded-xl" type="password" name="password" id="" />

                {
                    incorrectLogin && 
                    <p className="text-sm pl-3 text-red-600 font-semibold"><span className="font-bold tracking-wider">Warning:</span> Email or Password is incorrect</p>
                }

                <button onClick={handleSubmit} className="border mt-4 mb-3 mx-auto border-orange-500 px-7 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500">Sign in</button>
                <button>forgot Password</button>
            </form>
        </div>
        
    )
}