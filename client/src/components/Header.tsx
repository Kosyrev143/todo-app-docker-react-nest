import {FC} from "react";
import {Link, NavLink, useNavigate} from "react-router-dom";
import {FaBtc, FaSignOutAlt} from "react-icons/fa";
import { RiCalendarTodoFill } from "react-icons/ri";
import auth from "../pages/Auth.tsx";
import {useAuth} from "../hooks/useAuth.ts";
import {useAppDispatch} from "../store/hooks.ts";
import {logout} from "../store/user/userSlice.ts";
import {removeTokenFromLocalStorage} from "../helpers/localstorage.helper.ts";
import {toast} from "react-toastify";

const Header:FC = () => {
    const isAuth = useAuth();
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('Вы вышли из аккаунта')
        navigate('/')
    }
    console.log(isAuth)
    return <header className={'flex items-center justify-between bg-gray-900 p-4 py-2 shadow-sm backdrop-blur-sm'}>
        <Link to={"/"}>
            <RiCalendarTodoFill  size={20}/>
        </Link>



        {/* Menu */}
        {isAuth && (
            <nav className={"ml-auto mr-10"}>
                <ul className={"flex items-center gap-5 "}>
                    <li>
                        <NavLink to={"/"} className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}
                        >
                            Дом</NavLink>
                    </li>
                    <li>
                        <NavLink to={"/todo"}
                                 className={({isActive}) => isActive ? 'text-white' : 'text-white/50'}>Задачи</NavLink>
                    </li>
                </ul>
            </nav>
        )

        }


        {/* Actions */}
        {
            isAuth ? (
                <button className={"btn btn-red"} onClick={logoutHandler}>
                    <span>Выйти</span>
                    <FaSignOutAlt/>
                </button>
            ) : (
                <Link className={"py-2 text-white/50 hover:text-white ml-auto"} to={'/auth'}>
                    Вход / Регистрация
                </Link>
            )
        }
    </header>
}

export default Header;
