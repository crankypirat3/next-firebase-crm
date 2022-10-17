import Link from "next/link"
import Image from "next/image"

import { useEffect, useRef, useState } from "react";
import {GiHamburgerMenu} from "react-icons/gi";

import { useSelector } from "react-redux";
import userSlice from "../slices/userSlice";



export default function Navbar({user, scrollMenu}) {
    const [menu, setMenu] = useState(false)
    

    
    const ref = useRef()

    const logoRef = useRef()

    useEffect(() => {
        const outsideClick = (e) => {
            if (menu && ref.current && !ref.current.contains(e.target) && !logoRef.current.contains(e.target)) {
                setMenu(false)
            }
        }
        document.addEventListener("mousedown", outsideClick)

        const close = () => {
            setMenu(false)
        }

        if ( menu ) {
            document.addEventListener("scroll", close)

        }
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", outsideClick)
            document.removeEventListener("scroll", close)
    }
    },[menu]) 

    

    const menuSlide = (e) => {
        setMenu(!menu)
       
        }    
    
        // console.log(user.user.email)
    return(
        <div className="">
            <nav className="fixed w-full flex z-30 items-center justify-around md:justify-evenly bg-blue-200 border-b border-black max-h-20">
                <div className="w-28 my-1 ">
                    <Image src={"/logo-navbar.png"} alt="logo" width={1000} height={623} layout="responsive"/>
 
                </div>
                <div className={`hidden md:flex`}>
                    <Link href="#">
                        <a className="  px-3 py-7  hover:bg-blue-400 hover:text-white">Home</a>
                    </Link>
                    <Link  href="#">
                        <a className=" px-3 py-7  hover:bg-blue-400 hover:text-white">Product</a>
                    </Link>
                    <Link href="#">
                        <a className=" px-3 py-7  hover:bg-blue-400 hover:text-white">Pricing</a>
                    </Link>
                    
                    
                </div>
                {
                    user.user==null ? 
                    <div className="hidden md:block">
                        <Link href="/sign-in">
                            <a className=" mr-2 border border-orange-500 grow-1 px-6 py-2 bg-orange-500 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500">Sign In</a>
                        </Link>
                        <Link href="/sign-up">
                            <a className="ml-2 grow-1 px-6 py-2 bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Sign Up</a>
                        </Link>
                    </div> 
                    
                    : 
                    
                    <div className="hidden md:block">
                        <Link href={{
                            pathname: '/[user]/dashboard',
                            query:{user : user.user.uid}

                    }}>
                            <a className="ml-2 grow-1 px-4 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Dashboard</a>
                        </Link>
                    </div>
                }
                

                <button ref={logoRef} onClick={menuSlide} className="py-6 md:hidden">
                    <GiHamburgerMenu className="w-8 h-7 cursor-pointer" />
                </button>
            
            </nav>

           
            

            
                <div id="mobileMenu" ref={ref} className={`${menu ? "right-0" : "right-[-500px]" } z-50 fixed flex flex-col w-72 top-[79px] h-screen transition-all duration-500 ease-in-out bg-blue-100 md:hidden`}>
                    <Link href="#">
                        <a className="py-3 px-5 mx-auto w-full text-center my-10 hover:bg-blue-400 hover:text-white">Home</a>
                    </Link>
                    <Link  href="#">
                        <a className="py-3 px-5 mx-auto w-full text-center my-10 hover:bg-blue-400 hover:text-white">Product</a>
                    </Link>
                    <Link href="#">
                        <a className="py-3 px-5 mx-auto w-full text-center my-10 hover:bg-blue-400 hover:text-white">Pricing</a>
                    </Link>
                    {
                        user.user == null ?
                        <div className="flex justify-around mt-36">
                            <Link href="/sign-in">
                                <a className="border grow-1 px-6 py-3 bg-orange-500 text-white font-semibold rounded-xl hover:bg-white hover:text-blue-500 hover:border-blue-500">Sign In</a>
                            </Link>
                            <Link href="../sign-up">
                                <a className=" grow-1 px-6 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Sign Up</a>
                            </Link>
                        </div>
                    :
                    <div className="flex mt-36 md:hidden">
                        <Link href="#">
                            <a className="">{user.name}</a>
                        </Link>
                        <Link href={{
                                    pathname: '/[user]/dashboard',
                                    query:{user : user.user.uid}

                            }}>
                            <a className=" mx-auto grow-1 px-4 py-3 bg-white text-blue-500 border border-blue-500 font-semibold rounded-xl hover:bg-blue-500 hover:text-white">Dashboard</a>
                        </Link>
                    </div>

                    }
                

                </div>
           
        </div>
        
    )
}