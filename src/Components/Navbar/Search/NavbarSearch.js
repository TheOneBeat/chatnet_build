import React from 'react'
import {Link,Outlet} from 'react-router-dom'

export default function NavbarSearch() {
  return (
    <>
         <nav style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
            <Link to="/search/newContacts" style={{marginRight:'8px'}}>Recherche d'amies</Link>
            <Link to="/search/notification">Requête d'amies</Link>
        </nav>
        <Outlet/>
    </>
  )
}
