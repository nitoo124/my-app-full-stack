import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import Productview from '../components/pages/productview'
import { Products } from '../../../sanity.types'
import MegaSaleBanner from '../components/pages/megaSaleBanner'

export const dynamic = "force-static";
export const revalidate = 60;



async function page() {
  const Products:Products[] = await getAllProducts()
  const categories = await getAllCategories();

  console.log(crypto.randomUUID().slice(0, 5) + `>>> Rerendered the home page cache with ${Products.length}
  products and ${categories.length} categories`);
  return (
    <div className=' max-w-screen-xl mx-auto min-h-screen'>
      <MegaSaleBanner/>

  <Productview products={Products} categories={categories}/>
    
      
    </div>
  )
}

export default page
