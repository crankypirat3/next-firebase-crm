import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react'
import CustomerInputForm from '../components/CustomerInputForm'
import Footer from '../components/Footer'
import styles from '../styles/Home.module.css'

// import userSlice from '../slices/userSlice'
import { useSelector, useDispatch } from 'react-redux'
import LoginForm from '../components/LoginForm'
import Navbar from '../components/Navbar'
import Card from '../components/card'

import {auth} from '../firebase'

import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from '../slices/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'

// import { getAuth } from 'firebase/auth'



export default function Home() {
  const currentUser = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const router = useRouter()

  const redirect = () => {
    router.push("/sign-up")
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (userAuth) =>{
      // console.log(userAuth.uid)
          if(userAuth){
            dispatch(login({
              email: userAuth.email,
              uid: userAuth.uid,
          }))
          } else {
            dispatch(logout());
          }
            
      })
  },[dispatch])
  return(
    <div className='min-h-screen relative'>
      <Navbar user={currentUser}  />
      <div className=' bg-blue-200 mx-auto rounded-2xl pt-[79px]'>
        <div className='flex flex-col items-center justify-center md:flex-row bg-blue-500'>
          <div className="">
            <Image src='/Typing-amico.png' width={800} height={800} alt='hero image'/>

          </div>
          <h2 className='bg-orange-400 mx-4 w-full text-white rounded-2xl font-bold tracking-wider md:w-auto p-6 text-center z-10 mb-4'>Connect to your Customers Anywhere</h2>
        </div>
      </div>

      {/* Product */}
      <h2 className='text-3xl text-center font-bold tracking-wider underline underline-offset-8 underline-offset-x decoration-purple-400 text-red p-5'>What We Do</h2>
      {/* <div className=' bg-sky-200'>
        <div className="flex flex-col items-center">
          <Image />
          <p className='w-1/2'>img</p>
          <div className='w-1/2'>
            <h3 className='text-2xl font-bold text-center'>Step 1:</h3>
            <p className='p-3 my-2 text-lg'>After Creating your account, you generate a link. Then, you copy and paste it in wherever you want to receive feedback</p>
          </div>
        </div>

      </div> */}

      
      {/* Testimonials */}
      <h2 className='text-3xl text-center font-bold tracking-wider underline underline-offset-8 underline-offset-x decoration-purple-400 text-red p-5'>Testimonials</h2>
      <div className='xs:mx-auto max-w-sm mx-auto md:max-w-none md:mx-auto md:flex md:justify-center  md:space-x-4'>
        <Card />
        <Card />

        <Card />
      </div>

      {/* Call To Action */}
      <h2 className='text-3xl text-center font-bold tracking-wider underline underline-offset-8 underline-offset-x decoration-purple-400 text-red p-5'>Sign Up Today</h2>

      <div className="overflow-hidden">
        <ul className='flex flex-col text-center space-y-5'>
          
          <li className='text-lg font-bold'>Unlimted Messages! </li>
          <li className='text-lg font-bold'>It&apos;s Free!</li>
          <li className='text-lg font-bold mb-4'>Cancel Any Time</li>
        
        </ul>
        <div className='text-center mt-5 mb-0'>
          <button onClick={redirect} className='px-8 py-5 bg-orange-500 rounded-2xl mb-4 mx-auto text-white'>
            Get Started
          </button>

        </div>
      </div>

      
      
       <footer className='h-20 bg-blue-200 border-t border-black'>
        
       </footer>

    </div>

  )

  
}
