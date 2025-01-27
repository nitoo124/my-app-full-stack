import { getAllProducts } from '@/sanity/lib/products/getAllProducts'
import { getAllCategories } from '@/sanity/lib/products/getAllCategories'
import Productview from '../components/pages/productview'
import { Products } from '../../../sanity.types'
import MegaSaleBanner from '../components/pages/megaSaleBanner'

async function page() {
  const Products:Products[] = await getAllProducts()
  const categories = await getAllCategories();
  return (
    <div className=' max-w-screen-xl mx-auto'>
      <MegaSaleBanner/>

  <Productview products={Products} categories={categories}/>
    
      
    </div>
  )
}

export default page
