import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router"

const AppLayout = () => {

  const user = useSelector(state => state?.user.userId)
  const navigate = useNavigate()
  
console.log(user);

  useEffect(()=>{

    if (!user) {
      navigate('/auth/signin')
    }else{
      navigate('/auth/dashboard')
    }

  },[user])
  return (
    <div>
      <Outlet />
    </div>
  )
}

export default AppLayout
