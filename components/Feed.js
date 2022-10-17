import {
  collection,
  query,
  where,
  getDocs,
  documentId,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import TicketDetails from "./TicketDetails";

import Paginate from "../components/Paginate";

// Add Pagination to Feed Component
// Add  Archive Function for resolved tickets before they are deleted
// Add Username to Sign in and Replace UID With it
// Add Reply function that sends message to Customer Email and maybe phone??
// Add Loading Component to make UX smoother
// Add a tag system to filter tickets

// Make Forms customizable by the user

export default function Feed({ user }) {
  const [tickets, setTickets] = useState([]);
  const [ticketDetails, setTicketDetails] = useState();

  const [loading, setLoading] = useState(true);

  // Pagination State

  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(6);

  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(3);

  const getTickets = async () => {
    const q = query(
      collection(db, "tickets"),
      where("user", "==", user.user.uid)
    );
    let temp = [];
    let temp1 = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      temp1 = { data: doc.data(), id: doc.id };
      temp = [...temp, temp1];

      setTickets(temp);
    });
    setLoading(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    document.body.style.overflow = "hidden";
    // setTicketDetails(tickets[e.target.value])
    const temp1 = e.target.id;
    // console.log(e.target.id)
    const right = currentTickets.filter((x) => x.id == temp1);
    setTicketDetails(right[0]);
    // console.log(right[0])
  };

  useEffect(() => {
    // setTimeout(getTickets, 1000);
    getTickets();
  }, []);

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const numberOfPages = tickets.length / ticketsPerPage;

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    
    
  };

  return !loading ? (
    <>
      <div>
        {ticketDetails && (
          <TicketDetails
            ticketDetails={ticketDetails}
            setTicketDetails={setTicketDetails}
            tickets={tickets}
            setTickets={setTickets}
          />
        )}
      </div>

      <div className=" flex flex-col min-h-[550px] mx-3 md:mx-auto max-w-3xl bg-gray-400 rounded-lg p-3">
        {tickets.length == 0 && (
          <p className="text-3xl text-white text-center">No tickets Yet</p>
        )}

        <ul>
          {currentTickets.map((ticket, index) => {
            return (
              <li
                key={index}
                id={ticket.id}
                onClick={handleClick}
                className="bg-blue-100 my-4 cursor-pointer rounded-lg z-20 h-20 overflow-hidden"
              >
                <h3 className="text-lg py-2 ml-5 z-0 pointer-events-none">
                  {" "}
                  {ticket.data.firstName} {ticket.data.lastName}{" "}
                </h3>
                <p className="py-2 ml-2 z-0 pointer-events-none">
                  {ticket.data.comment}
                </p>
              </li>
            );
          })}
        </ul>
        
        <Paginate
          
          ticketsPerPage={ticketsPerPage}
          tickets={tickets}
          currentPage={currentPage}
          changePage={changePage}
          startIndex={startIndex}
          setStartIndex={setStartIndex}
          endIndex={endIndex}
          setEndIndex={setEndIndex}
        />
        
        
      </div>
    </>
  ) : (
    <p className="text-center font-bold tracking-wider text-5xl text-orange-500">
      Loading
    </p>
  );
}
