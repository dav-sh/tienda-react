import {Navigate, Outlet} from 'react-router-dom'

function ProtectedRoute({children}) {
    
  return (
    children? children : <Outlet/>
  )

}

export default ProtectedRoute