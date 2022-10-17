import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth } from "../firebase";
import { login, logout } from "../slices/userSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useState } from "react";





export default function useFirebaseAuth() {
    const [user, setUser] =useState()
    const currentUser = useSelector((state) => state.user)
    const dispatch = useDispatch()
    // console.log(currentUser)

    // console.log('hello')

    // onAuthStateChanged(auth, (userAuth) =>{
    //     console.log(userAuth)
    //         if(userAuth){
    //           dispatch(login({
    //             email: userAuth.email,
    //             uid: userAuth.uid
    //         }))
    //         } else {
    //           dispatch(logout());
    //         }

           
    //     //   setUser(currentUser)
    //     })

    useEffect(()=>{

        onAuthStateChanged(auth, (userAuth) =>{
        //   console.log(userAuth)
              if(userAuth){

                dispatch(login({
                  email: userAuth.email,
                  uid: userAuth.uid
              }))
              console.log('set')
              } else {
                dispatch(logout());
              }

             
            setUser(currentUser)
          })
      },[dispatch])

      return user;
      
}   