import {useEffect, useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";
import {useDispatch} from "react-redux";
import {useAppDispatch} from "./store/hooks.ts";
import {getTokenFromLocalStorage} from "./helpers/localstorage.helper.ts";
import {AuthService} from "./services/auth.service.ts";
import {login, logout} from "./store/user/userSlice.ts";

function App() {
  const [count, setCount] = useState(0)
  const dispatch = useAppDispatch()

  const checkAuth = async () => {
    const data1 = localStorage.getItem('token');
    const token: string = data1 ? JSON.parse(data1) : '';
    try{
      if(token){
        // const data = await AuthService.getProfile()

        // if(data){
        //   dispatch(login(data))
        // }
        // else{
        //   dispatch(logout())
        // }
      }
    }catch (error){
      console.log(error)
    }
  }

  useEffect(() => {
    //checkAuth()
  }, [])

  return (
      <RouterProvider router={router}/>
  )
}

export default App
