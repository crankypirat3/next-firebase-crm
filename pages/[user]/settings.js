import { useSelector } from "react-redux"
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import Header from "../../components/Header";

import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from "../../tailwind.config";






export default function Settings(){
    // const fullConfig = resolveConfig(tailwindConfig);
    // fullConfig.theme.colors.primary

    // console.log(fullConfig.theme.colors.primary)

    const handleSignOut = () =>{

        signOut(auth).then(()=>{
            router.push("/")
        })
        
    }

    useFirebaseAuth()
    const currentUser = useSelector((state) => state.user)
    
    // console.log(currentUser)

    if (currentUser.user) {
        // console.log(currentUser)
        return(
            <>
                <Header user={currentUser} signOut={handleSignOut}/>
            </>
        )
    } else{
        return(
            <p>loading</p>
        )
    }


}