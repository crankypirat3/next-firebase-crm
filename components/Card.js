import Image from "next/image";

const Card = () => {
    return(
        <div className='shadow-2xl border border-gray-400 mx-auto w-full md:w-auto md:mx-0 max-w-xs bg-gray-100 rounded-xl p-4 mb-4'>
            {/* title */}
            <h2 className='text-2xl text-center font-bold tracking-wider text-gray-900 mb-2'>Perfect for my Business</h2>
            {/* comments */}
            <p className='text-center text-gray-700'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis animi saepe a in. Consequatur blanditiis quis perferendis temporibus sint distinctio est rem enim expedita alias eum veniam, mollitia, molestias aspernatur!</p>
            <div className='flex mx-auto bg-gray-300 justify-center items-center mt-20 p-5 rounded-md'>
            {/* {image} */}
                <div className="w-12 h-12 ">   
                    <Image src='/young_man.jpg' width={100} height={100} alt="young man smiling" className="rounded-full"/>
                </div>
                {/* <p className='mx-3'>pic</p> */}
                <div className='ml-3'>
                    <p className='text-black tracking-wide'>John Doe</p>
                    <p className='text-gray-600'>Owner of Widgets Inc.</p>
                </div>
            </div>
       
        </div>
    )
}


export default Card;
    