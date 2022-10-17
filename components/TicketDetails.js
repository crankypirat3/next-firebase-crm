import { IoMdClose } from "react-icons/io";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useState } from "react";
import { consoleUrl } from "firebase-tools/lib/utils";

const TicketDetails = ({ticketDetails, setTicketDetails, tickets, setTickets}) => {

    const [warnModal, setwarnModal] = useState(false);

    const warnDelete = () => {
        setwarnModal(!warnModal);
    }

    const sendEmail = () => {
        console.log('email sent')
    }

    const  handleDelete = async (e) => {
        e.preventDefault();
        await deleteDoc(doc(db, "tickets", ticketDetails.id ))
        let temp = tickets.filter(ticket => ticket.id != ticketDetails.id)

        setTickets(temp);
        handleClose()
    }

    const handleClose = () => {
        console.log('close')
        document.body.style.overflow = 'unset' 
        setTicketDetails()
    }

    const handleCloseModal = () => {
        setwarnModal(false)
    }
    // console.log(tickets)
    return (
        <div className="fixed z-40 left-0 top-0 w-full h-full overflow-auto bg-black/[.4]">
                    <div className="relative bg-white  mt-48 max-w-2xl p-5 rounded-xl mx-10 md:mx-auto">
                        <IoMdClose onClick={handleClose} className="h-8 w-8 cursor-pointer ml-auto mr-4 my-2"/>
                        <div className="flex my-2 p-1">
                            <label className="opacity-100 text-black">Name: </label>
                            <p className=" ml-3 md:ml-32">{ticketDetails.data.firstName} {ticketDetails.data.lastName}</p>
                        </div>
                        <div className="flex my-2 p-1 items-center">
                            <label className=" text-lg">Email:</label>
                            <p className=" ml-3 md:ml-32">{ ticketDetails.data.email}</p>
                        </div>

                        <div className="flex my-2 p-1 items-center">
                            <label className=" text-lg">Order:</label>
                            <p className=" ml-3 md:ml-32">{ ticketDetails.data.order}</p>
                        </div>
                        
                        <div className="flex flex-col my-2 p-1">
                            <label>Comments: </label>
                            <p className=" mt-4 px-3 md:ml-8 ">{ticketDetails.data.comment}</p>
                        </div>
                        
                        <label className="my-2"> Reply: </label>
                        <textarea className="w-full min-h-[200px] my-2 p-3 border border-blue-400 rounded-lg resize-none focus:outline-none" type="text" />

                        <div className="relative items-baseline">
                            <button onClick={sendEmail} className="block mx-auto border bg-blue-400 px-5 py-3 md:px-8 md:py-4 text-xl rounded-xl">Send</button>
                            <button onClick={warnDelete} className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-red-500 text-white px-3 py-1 md:px-5 md:py-3 rounded-xl">Delete</button>
                        </div>

                        {/* warn Modal */}
                        {
                            warnModal &&
                            <div className="fixed z-40 left-0 top-0 w-full h-full overflow-auto bg-black/[.7]">
                                <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/3 w-full max-w-[340px] h-60 bg-gray-200 rounded-lg z-50 md:max-w-lg ">
                                    <IoMdClose onClick={handleCloseModal} className="h-8 w-8 cursor-pointer ml-auto mr-4 mt-2"/>
                                    <p className="px-3 text-2xl text-red-500 font-bold text-center">Are You Sure?</p>
                                    <p className="mt-16 p-3 text-sm text-gray-800 font-extrabold">This Action Cannot be Undone</p>
                                    <button onClick={handleDelete} className=" block mx-auto px-4 py-2 bg-red-500 text-white rounded-xl max md:px-6 md:py-3 md:my-1">Delete</button>
                                </div>
                            </div>
                            
                            

                        }
                       
                    </div>

                    

                </div>
                
    )
}

export default TicketDetails;