"use client"
import {AnimatePresence, motion} from "framer-motion"
import ProductCard from "./ProductCard"
import { Products } from "../../../../sanity.types"


function ProductGrid({products}:{products:Products[]}) {
  return (
    <div className=' max-w-screen-xl  mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4'>

        {
            products?.map((product:Products)=>{
                return(
                <AnimatePresence key={product._id}>
                    <motion.div
                    layout
                    initial={{opacity:0.2}}
                    animate={{opacity:1}}
                    exit={{opacity:0}}
                    className=" flex justify-center p-4">

                    

                    <ProductCard key={product._id} product={product}  />

                    </motion.div>
                </AnimatePresence>
                )
            })
        }
      
    </div>
  )
}

export default ProductGrid