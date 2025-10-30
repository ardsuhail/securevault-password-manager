export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

import React from 'react'
import AddNewPassword from '@/component/AddNewPassword';
const page = () => {
  return (
    <main>
     <AddNewPassword/> 
    </main>
  )
}

export default page
