import { CategorySelectorComponent } from "@/components/category-selector";
import { Category, Products } from "../../../../sanity.types";
import ProductGrid from "./productGrid";

interface ProductsViewProps{
    products:Products[];
    categories: Category[]
}
function Productview({products, categories}:ProductsViewProps) {
  return (
    <div className="flex  flex-col">

        {/* categories */}
        <div className=" w-full sm:w-[200px]">
            <CategorySelectorComponent categories={categories}/>

        </div>



        {/* products */}
        <div className=" flex-1">
            <div>
            <ProductGrid products={products}/>
            <hr />
            </div>
        </div>
        

      
    </div>
  )
}

export default Productview
