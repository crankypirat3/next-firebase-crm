import { useState } from "react"

import { db } from "../firebase";
import {doc, setDoc, collection, addDoc} from "firebase/firestore";
import { async } from "@firebase/util";


export default function CustomerInputForm({user}){

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [order, setOrder] = useState('');
    const [comment, setComment] = useState('');
    const [user1, setUser1] = useState(user)

    function isValidEmail(email) {
        return /\S+@\S+\.\S+/.test(email);
      }
    
    const validate = () => {
        if(isValidEmail(email) && firstName.length > 2 && lastName.length > 2 && comment.length > 5 ) {
            return true
        }
    }


    const  handleSubmit  = async (e) => {
        e.preventDefault();
        
        if(validate()) {
            await addDoc(collection(db, "tickets"), {
                firstName: firstName,
                lastName: lastName,
                email:email,
                order:order,
                comment:comment,
                user:user
                }).then(() =>{
                    // console.log(e + 'done')
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setOrder('');
                    setComment('');
                    // console.log(user1)
            })
        } else {
            console.log("something is inccorenct")
        }
    }
    // console.log(firstName.length)
    return(
        user ? 
        <div className="bg-gray-200 mx-4 sm:mx-auto my-10 max-w-3xl rounded-2xl border">
            <h2 className="text-3xl p-4 text-center text-gray-800 font-semibold">Input Form</h2>
            <form className="mx-auto my-3 grid grid-cols-12 gap-2 auto-cols-auto">
                <div className="col-span-12 sm:col-span-6 mx-auto">
                    <label className="block ml-3 text-sm pt-2 text-gray-700 font-bold">First Name:</label>
                    <input value={ firstName }  onChange={(e) => setFirstName(e.target.value)} type="text" name="firstName" placeholder="First Name" className=" mx-2 my-2 px-2 py-3 border outline-none rounded-xl"  />
                </div>

                <div className="col-span-12 sm:col-span-6 mx-auto">
                    <label className="block ml-3 text-sm pt-2 text-gray-700 font-bold">Last Name:</label>
                    <input value={ lastName } onChange={(e) => setLastName(e.target.value)} type="text" name="lastName" placeholder="Last Name" className=" mx-2 my-2 px-2 py-3 border-none outline-none rounded-xl"  />
                </div>

                <div className="col-span-12  sm:col-span-6 mx-auto">
                    <label className="block ml-3 text-sm pt-2 text-gray-700 font-bold">Email Address:</label>
                    <input value={ email } onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email Address" className=" mx-2 my-2 px-2 py-3 border-none outline-none rounded-xl "  />
                </div>

                <div className="col-span-12  sm:col-span-6 mx-auto">
                    <label className="block ml-3 text-sm pt-2 text-gray-700 font-bold">Order Number:</label>
                    <input value={ order } onChange={(e) => setOrder(e.target.value)} type="text" name="orderNumber" placeholder="Order Number" className=" mx-2 my-2 px-2 py-3 border-none outline-none rounded-xl"  />
                </div>

                <div className="col-span-12 mx-3">
                    <label className="block ml-2 text-sm pt-2 text-gray-700 font-bold">Comments:</label>
                    <textarea value={ comment } onChange={(e) => setComment(e.target.value)} id="" rows="10" placeholder="Type your comments here..." className=" resize-none max-h-50 w-full max-w-4xl mx-auto my-2 px-5 py-4 outline-none rounded-xl"></textarea>
                </div>
              
                <button onClick={handleSubmit} className="col-span-12 mx-6 text-center self-center px-4 py-3 mb-3 rounded-xl bg-green-600 text-white font-bold tracking-wide">Submit</button>

            </form>
        </div>
        :
        <p>loading</p>
    )
    

    
}