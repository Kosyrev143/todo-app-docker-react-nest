import React, { FC, useState } from "react";
import { toast } from "react-toastify";
import instance from "../api/axios.api.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../store/hooks.ts";
import { login } from '../store/user/userSlice.ts';

const Auth: FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useAppDispatch()

    const register = async () => {
        try {

            const response = await instance.post('/user/signUp', {
                email: email,
                password: password
            });
            console.log(response.data);
            toast.success('Аккаунт успешно создан!');
            setIsLogin(!isLogin); // Изменение значения isLogin на противоположное
        } catch (error) {
            console.error("Ошибка регистрации:", error);
            toast.error("Ошибка регистрации");
        }
    }


    let navigate = useNavigate();

    const loginApp = async () => {
        if(email == "" || password == ""){
            toast.info("Пожалуйста заполните все поля")
            return;
        }
        try{
            const response = await instance.post('/auth/login', {
                email:email,
                password:password
            });
            localStorage.setItem("token", response.data.token);
            dispatch(login());
            navigate('/')
        }catch (error:any){

            if(error.response.status == 401)
                toast.warn(error.response.data.message)
            toast.warn(error.response.data.message)
        }
    }
    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle login
    }

    return (
        <div className={'mt-40 flex flex-col justify-center items-center bg-gray-700 text-white'}>
            <h1 className={'mb-10 text-center text-xl'}>
                {isLogin ? 'Вход' : 'Регистрация'}
            </h1>

            <form
                onSubmit={loginHandler}
                className={'mx-auto flex w-1/3 flex-col gap-5'}>
                <input type="text" className={'input'} placeholder={'Email'} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" className={'input'} placeholder={'Пароль'} onChange={(e) => setPassword(e.target.value)} />

                <button onClick={isLogin?loginApp:register} className={'btn btn-green mx-auto'}>
                    {isLogin ? 'Войти' : 'Зарегистрироваться'}
                </button>
            </form>

            <div className={'flex justify-center mt-5'}>
                <button onClick={() => setIsLogin(!isLogin)} className={'text-slate-300 hover:text-white'}>
                    {isLogin ? 'У тебя нет аккаунта?' : 'У тебя есть аккаунт?'}
                </button>
            </div>
        </div>
    );
};

export default Auth;
