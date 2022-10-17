import {auth} from "../firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login } from "../slices/userSlice";

import Router from "next/router";
import { setUserProperties } from "firebase/analytics";





export default function SignupFrom() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [error, setError] = useState(false)

    const dispatch = useDispatch();

    // const handleChange = (e) =>

    const parseError = (error) =>{
        let temp = error.replace('auth/','')
        let temp2 = temp.replaceAll('-', ' ');
        setError(temp2);
    }


    const currentUser = useSelector((state) => state.user.user);
    useEffect(() => {
            if(currentUser != null) {
                Router.push('/')
        }
    },[currentUser])

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }

    const handleSubmit = (e) => {
        e.preventDefault()
        try {
            if(isValidEmail(email) && password ==confirmPassword) {


                createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;  
                    console.log(auth.currentUser)
                    // console.log(user)
                    dispatch(login({
                        // user: true,
                        email: user.email
                    }))
                })
                .catch((err) => {
                   
                    parseError(err.code);
                })
    
                
            }
            
        } catch (error) {
            
        }
        // if(isValidEmail(email) && password ==confirmPassword) {


        //     createUserWithEmailAndPassword(auth, email, password)
        //     .then((userCredential) => {
        //         const user = userCredential.user;  
        //         console.log(auth.currentUser)
        //         // console.log(user)
        //         dispatch(login({
        //             // user: true,
        //             email: user.email
        //         }))
        //     })
        //     .catch((err) => {
        //         console.log(err.message)
        //     })

            
        // }
        // console.log(email)

       
    }
    // still need to add Controls to Form
    return(
        <div className="bg-blue-300 mx-auto my-10 max-w-md rounded-2xl border ">
            <form className="flex flex-col mx-4  ">
                <h1 className="text-gray-800 font-semibold text-center text-3xl my-5">Sign Up form</h1>
                <label>Email:</label>
                <input onChange={ e => setEmail(e.target.value)} value={email}  className="max-w-md my-2 px-2 py-3 border-none outline-none rounded-xl" type="email" name="email" id="" />

                <label>Password</label>
                <input onChange={ e => setPassword(e.target.value)} value={password} className=" max-w-md my-2 px-2 py-3 border-none outline-none rounded-xl" type="password" name="password" id="" />

                <label>Re-Enter Password</label>
                <input onChange={ e => setConfirmPassword(e.target.value)} value={confirmPassword}  className=" max-w-md my-2 px-2 py-3 border-none outline-none rounded-xl" type="password" name="password" id="" />

                {
                    error &&
                    <p className="text-sm text-red-500 font-semibold tracking-wider">{error}</p>
                }

                <button onClick={handleSubmit} className="border mt-4 mb-3 mx-auto border-orange-500 px-7 py-4 bg-orange-500 text-white font-semibold rounded-xl text-xl hover:bg-white hover:text-blue-500 hover:border-blue-500">Sign Up</button>
                <button>forgot Password</button>
            </form>
        </div>
    )
}