import { useState } from "react";
import { useEffect, useRef } from "react";
import {BsFillArrowRightCircleFill, BsFillArrowLeftCircleFill } from 'react-icons/bs'

import {HiOutlineArrowLeft, HiOutlineArrowRight} from 'react-icons/hi'

const Paginate = ({ticketsPerPage, tickets, currentPage, changePage, startIndex, setStartIndex, endIndex, setEndIndex}) =>{

    
    const pageNumbers = [];

    const handleChange = (e) => {
        // if (e.target.value==1) {
        //     console.log('decrease')
        // } else {
        //     console.log("increase")
        // }
        console.log(e.target.value)
    }
    
    for (let i = 1; i <= Math.ceil(tickets.length / ticketsPerPage); i++ ) {
        pageNumbers.push(i);
        // console.log(pageNumbers)
    }

    const pageArray = pageNumbers.slice(startIndex, endIndex)


    const handleDecrement = () => {
        if(currentPage > 1) {
            changePage(currentPage-1)
        }
        if(currentPage > 2) {
            setStartIndex(currentPage - 3);
            setEndIndex(currentPage )
            // console.log('test')
          }
        
    }

    const handleIncrement = () => {
        if(currentPage < Math.ceil(tickets.length / ticketsPerPage)) {
            changePage(currentPage + 1)
        }
        if(currentPage > 1 && currentPage < pageNumbers.length-1) {
            setStartIndex(currentPage - 1);
            setEndIndex(currentPage + 2)
          }
    }


    return (
        <nav className="mt-auto flex justify-center items-center md:justify-end pr-4">
                {
                    currentPage != 1 &&    
                        <button onClick={handleDecrement}  className="mr-4 border border-black rounded-md p-1">
                            <HiOutlineArrowLeft className="h-7 w-7 cursor-pointer text-black" />
                        </button>            
                }    
            
                {
                    pageArray.map(number =>(
                            <button key={number} onClick={() => changePage(number)} className={
                                currentPage == number 
                                    ? "bg-orange-400 pagination-numbers border border-gray-800"
                                    : "bg-gray-100 pagination-numbers"
                            }>
                                {number}
                            </button>
                        
                    ))
                }
                {
                    currentPage != pageNumbers.length &&
                        <button onClick={handleIncrement} className="ml-4 border border-black rounded-md p-1">
                            <HiOutlineArrowRight className="h-7 w-7 cursor-pointer   "/>
                        </button>  

                }    
             
            {/* <div className="flex flex-col ml-32">
            <p className="">startIndex: {startIndex}   </p>  
           
            <p>endIndex: {endIndex}</p>    
            <p>current Page: {currentPage}</p>
            </div> */}
            
        </nav>
    )
}

export default Paginate;