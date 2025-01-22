import Productview from "@/app/components/pages/productview";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getProductsByCategory } from "@/sanity/lib/products/getProductsByCategory";

async function page({params}:{params:Promise<{slug:string}>}) {
    const {slug}= await params;

    const products = await getProductsByCategory(slug);
    const categories = await getAllCategories();
  return (
    <div className=" flex flex-col items-center justify-top min-h-screen
    bg-gray-100 p-4">

       <div className=" bg-white  p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className=" text-center font-bold text-4xl">{slug.split("_")
          .map((word)=>word.charAt(0).toUpperCase() + word.slice(1)).join(" ")}{" "}Collection
          </h1>
          <Productview products={products } categories={categories}/>

       </div>
      
    </div>
  )
}

export default page
