"use client"

import { useAuth, useUser } from "@clerk/nextjs";
import useBasketStore from "../store"
import { useRouter } from "next/navigation";
import { useState } from "react";
import AddToBasket from "@/app/components/pages/addToBasket";
import Image from "next/image";


function Cartpage() {
    const groupedItems = useBasketStore((state)=>state.getGroupedItems());
    const {isSignedIn} = useAuth();
    const {user} = useUser();
    const router = useRouter();

    const [isClient, setIsClient] = useState(false);
    const [Isloading, setIsLoading] = useState(false)
    

    if(groupedItems.length === 0){
        return(
            <div className=" container mx-auto p-4 flex flex-col items-center
             justify-center min-h-[50vh]">
                <h1 className=" text-2xl font-bold mb-6 text-gray-800 ">Your Cart</h1>
                <p className=" text-gray-600 text-lg">Cart is empty</p>

            </div>
        );
    }
    console.log(groupedItems)
return(
    <div className=" container mx-auto p-4 max-w-6xl">
        <h1 className=" text-2xl font-bold mb-4">Your Cart</h1>
        <div className=" flex flex-col lg:flex-row gap-8">
            <div className=" flex-grow">
                {
                    groupedItems?.map((item)=>{
                        return(
                            <div key={item.product._id}>
                                <div></div>
                                <div onClick={()=>router.push(`/product/${item.product.slug?.current}`)}>
                                   {
                                    
                                   }

                                </div>
                                <div>
                                    <AddToBasket product={item.product}/>
                                </div>
                                 </div>
                        )
                    })
                }
            </div>
        </div>
    </div>
)
}

export default Cartpage
