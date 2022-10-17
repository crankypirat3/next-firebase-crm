import { useEffect } from "react"
import { useState } from "react"
import { IoMdClose } from "react-icons/io"


const LinkModal = ({user, setLinkModalStatus, linkModalStatus}) => {

    useEffect(() => {
        getEnv()
    })

    const [env, setEnv] = useState()

    const handleClose = () => {
        setLinkModalStatus(!linkModalStatus)

    }

    const copyLink = () =>{
        navigator.clipboard.writeText(link123)
        alert("copied")
    }

    const getEnv = () => {
        if (process.env.NODE_ENV == 'production') {
            setEnv(process.env.NEXT_PUBLIC_AUTH_DOMAIN)
        } else {
            setEnv('http://'+process.env.NEXT_PUBLIC_DEVELOPMENT_DOMAIN)
        }
    }

    const link123 = `${env}/${user.user.uid}/feedback`
    // console.log(link123)
    return(
        <div className="fixed z-40  w-full h-full overflow-auto bg-black/[.4]">
            <div className="bg-gray-50 mx-5 md:mx-auto h-96 mt-48 max-w-2xl p-3 rounded-2xl">
                <IoMdClose onClick={handleClose} className="h-8 w-8 cursor-pointer ml-auto mr-4 mt-2"/>
                <h2 className="text-center text-2xl text-gray-700 font-bold">Copy your link</h2>
                <div className="bg-gray-100 max-w-min mx-auto">
                    <p className="  sm:text-base text-center mt-36 overflow-hidden p-2 border border-gray-600 rounded-xl">{ link123}</p>
                </div>
                <div className="text-center my-3">
                    <button onClick={copyLink} className="bg-blue-400 px-5 py-3 rounded-xl text-white">Copy</button>
                </div>
            </div>
        </div>
    )
}

export default LinkModal