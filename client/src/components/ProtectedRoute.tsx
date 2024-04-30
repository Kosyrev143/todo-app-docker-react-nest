import  {FC} from 'react';
import {useAuth} from "../hooks/useAuth.ts";
import { FaShieldHalved } from "react-icons/fa6";


interface Props{
    children:JSX.Element
}

export const ProtectedRoute:FC<Props> = ({children}) => {
    const isAuth = useAuth()
    return <>
        {isAuth?children:<div className="min-h-screen bg-gray-900 font-sans text-white flex flex-col justify-center items-center">
            <h1 className={'text=2xl'}>Чтобы увидеть эту страницу ты должен быть в системе</h1>
            <FaShieldHalved size={450}/>
        </div>}
    </>

}
