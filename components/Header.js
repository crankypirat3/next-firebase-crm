import Link from "next/link"
import Image from "next/image";
import { useState,useEffect, useRef } from "react";
import LinkModal from "./LinkModal";

import { IoMdSettings } from "react-icons/io"

export default function Header({user, signOut}) {

    const [linkModalStatus, setLinkModalStatus] = useState(false);

    const [show, setShow] = useState(false);

    const ref = useRef();
    const logoRef = useRef();

    useEffect(() => {
        const outsideClick = (e) => {
            // console.log(logoRef.current)
            if (show && ref.current && !ref.current.contains(e.target) && !logoRef.current.contains(e.target)) {
                setShow(false)
            }
        }
        document.addEventListener("mousedown", outsideClick)
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", outsideClick)
    }
    },[show]) 


    const createLink = () => {
       console.log(`http://localhost:3000/${user.user.uid}/dashboard`);
       setLinkModalStatus(!linkModalStatus)

    }
    const links = [
        {title: "Create Link", to: createLink}
    ]
    
    const handleShow = () => {
        (show ? setShow(false) : setShow(true))
    }
    return(
        <div className="bg-blue-200 flex justify-around border-b border-black">
            <div className="w-[90px] my-auto">
                <Image src={"/logo-navbar.png"} alt="logo" width={1000} height={623} layout="responsive"/>
            </div>


            <div className="items-baseline">

                {
                    links.map((link, index) => 
                    <button onClick={link.to} className="px-4 py-6 hover:bg-blue-400 hover:text-white" key={index}>
                        {link.title}
                    </button>
                    )
                }
                <div className="group inline-block">
                    <button ref={logoRef} onClick={handleShow}>
                        <IoMdSettings   className="text-gray-800 inline-block h-6 w-6 hover:cursor-pointer hover:rotate-45 duration-300 mx-2 " />
                    </button>
                    <div ref={ref} className={show ? " right-2 sm:right-auto flex flex-col text-center absolute rounded-lg bg-slate-200 shadow-xl mt-3" : "hidden"} >
                        <Link className="" href={{
                            pathname: '/[user]/dashboard',
                            query:{user : user.user.uid}

                            }}>
                            <a  className="hover:bg-blue-400 hover:text-white py-4 px-6 rounded-lg" >Dashboard</a> 
                        </Link> 
                            
                        <Link href={{
                            pathname: '/',
                            query:{user : user.user.uid}

                    }}>
                            <a className="hover:bg-blue-400 hover:text-white  py-4 px-6 rounded-lg">Home</a> 
                        </Link> 
                        <button className="hover:bg-blue-400 hover:text-white  py-4 px-6 rounded-lg" onClick={signOut}>Sign Out</button>
                    </div>
                </div>
            </div>
           
            
            {
                linkModalStatus &&
                <LinkModal user={user} linkModalStatus={linkModalStatus} setLinkModalStatus={setLinkModalStatus} />
            }
        </div>
    )
    
}