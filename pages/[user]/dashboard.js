import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../../firebase";

import LoginForm from '../../components/LoginForm'
import Header from "../../components/Header";
import Feed from "../../components/Feed";

import { onAuthStateChanged, signOut } from "firebase/auth";
import { login, logout } from "../../slices/userSlice";
import {useRouter} from "next/router";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import Footer from "../../components/Footer";
import { connectFirestoreEmulator } from "firebase/firestore";


export default function Dashboard() {

    useFirebaseAuth()
    const currentUser = useSelector((state) => state.user)

    const router = useRouter()
   
    const handleSignOut = () =>{

        signOut(auth).then(()=>{
            router.push("/")
        })
        
    }

        {
            if(currentUser.user) {
                return(
                    <div className="h-screen relative">
                        <Header user={currentUser} signOut={handleSignOut} />
                        <h2 className="text-gray-900 text-3xl text-center p-5">{currentUser.user.email}s Feed</h2>
                        <Feed user={currentUser} />
                        {/* <p>{currentUser.user.email}</p> */}
                        {/* <button onClick={handleSignOut} className="px-4 py-3 block my-10 mx-auto bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Sign Out</button> */}
                        
                            <Footer />

                    </div>
                )
            } else {
                return(
                    <button onClick={()=>{router.push('/sign-in')}} className="px-4 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Sign In</button>
                    // <LoginForm />
                )
               
            }
        }       
    
        
}