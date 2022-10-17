import { useRouter } from "next/router"
import CustomerInputForm from "../../components/CustomerInputForm";

import { useSelector } from "react-redux";

export default function Feedback() {
    const router = useRouter();
    const user = router.query.user;


    return(
        <>
            <CustomerInputForm user={user} />
        </>
        
    )
}

