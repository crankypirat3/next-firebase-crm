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
import Card from '../components/Card'

import {auth} from '../firebase'

import { onAuthStateChanged } from 'firebase/auth'
import { login, logout } from '../slices/userSlice'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useRef } from 'react'




export default function Home() {
  const currentUser = useSelector((state) => state.user)

  const dispatch = useDispatch();
  const router = useRouter()

  const heroRef = useRef()
  const productRef = useRef()
  const testimonialsRef = useRef()

  const scroll = () => {
    testRef.current.scrollIntoView({behavior:'smooth'})
  }

  const redirect = (e) => {
    router.push(e.target.value)
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
      <Navbar user={currentUser} scroll={scroll}  />
      <div id='hero' className='scroll-smooth bg-blue-200 mx-auto rounded-2xl pt-[79px]'>
        <div className='flex flex-col items-center justify-center md:flex-row bg-blue-500'>
          <div className="">
            <Image src='/Typing-amico.png' width={800} height={800} alt='hero image'/>

          </div>
          <h2 ref={heroRef} className='bg-orange-400 mx-4 w-full text-white rounded-2xl font-bold tracking-wider md:w-auto p-6 text-center z-10 mb-4'>Connect to your Customers Anywhere</h2>
        </div>
      </div>

      {/* Product */}
      <h2 className='scroll-smooth text-3xl text-center font-bold tracking-wider underline underline-offset-8 underline-offset-x decoration-purple-400 text-red p-5'>What We Do</h2>
      <div id='product'  className=" mx-2 max-w-4xl md:mx-auto bg-blue-100 p-4 rounded-2xl">
        <h3 className=' text-xl leading-loose text-center font-semibold tracking-wide underline underline-offset-8 decoration-orange-500'>
          We Specialize in Connecting you and your Customers
        </h3>
        <p className='my-4 p-3 leading-loose text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde natus, possimus recusandae deleniti reiciendis explicabo qui, consequuntur mollitia libero exercitationem, beatae officia. Mollitia provident repellendus suscipit tenetur, asperiores quaerat officia velit incidunt dolore necessitatibus!</p>
        <p className='my-4 p-3 leading-loose text-lg'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde natus, possimus recusandae deleniti reiciendis explicabo qui, consequuntur mollitia libero exercitationem, beatae officia. Mollitia provident repellendus suscipit tenetur, asperiores quaerat officia velit incidunt dolore necessitatibus!</p>

      </div>
      
      {/* Testimonials */}
      <h2 ref={testimonialsRef}  className='scroll-smooth text-3xl text-center font-bold tracking-wider underline underline-offset-8 underline-offset-x decoration-purple-400 text-red p-5'>Testimonials</h2>
      <div id='testimonials' className='xs:mx-auto max-w-sm mx-auto md:max-w-none md:mx-auto md:flex md:justify-center  md:space-x-4'>
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
          {
            currentUser.user ?
            <button onClick={redirect} value={`/${currentUser.user.uid}/dashboard`} className='px-8 py-5 bg-orange-500 rounded-2xl mb-4 mx-auto text-white'>
              Dashboard
            </button> 
            :
            <button onClick={redirect} value={'/sign-up'} className='px-8 py-5 bg-orange-500 rounded-2xl mb-4 mx-auto text-white'>
              Get Started
            </button>
          }
          

        </div>
      </div>

      
      
       <footer className='h-20 bg-blue-200 border-t border-black'>
        
       </footer>

    </div>

  )

  
}
