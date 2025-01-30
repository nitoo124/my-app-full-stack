// import { getMyOrders } from '@/sanity/lib/orders/grtMyOrders';
// import { auth } from '@clerk/nextjs/server'
// import { redirect } from 'next/navigation';
// import React from 'react'

//  async function Orders() {
//     const  {userId} = await auth();
//      if (!userId) {
//         return redirect('/')
        
//      }

//      const orders = await getMyOrders(userId)
//   return (
//     <div>
//       {orders.map(()=>{
//         return(
//             <div></div>
//         )
//       })}
      
//     </div>
//   )
// }

// export default Orders
import React from 'react'

function orders() {
  return (
    <div>
      orders
      
    </div>
  )
}

export default orders

