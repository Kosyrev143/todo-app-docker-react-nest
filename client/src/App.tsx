import {useEffect,} from 'react'
import './App.css'
import {RouterProvider} from "react-router-dom";
import {router} from "./router/router.tsx";

function App() {

  // const checkAuth = async () => {
  //   const data1 = localStorage.getItem('token');
  //   const token: string = data1 ? JSON.parse(data1) : '';
  //   try{
  //     if(token){
  //       // const data = await AuthService.getProfile()
  //
  //       // if(data){
  //       //   dispatch(login(data))
  //       // }
  //       // else{
  //       //   dispatch(logout())
  //       // }
  //     }
  //   }catch (error){
  //     console.log(error)
  //   }
  // }

  useEffect(() => {
    //checkAuth()
  }, [])

  return (
      <RouterProvider router={router}/>
  )
}

export default App
