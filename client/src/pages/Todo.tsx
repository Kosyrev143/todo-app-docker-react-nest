import React,{ FC, useState } from "react";
import instance from "../api/axios.api.ts";
import {getLoginInfo} from "../utils/LoginInfo.tsx";
import {toast} from "react-toastify";

interface TodoModel{
    title:string;
    date:string;
    id:number;
}
const Todo: FC = () => {
    const [todos, setTodos] = React.useState<TodoModel[]>([]);
    const title:any = React.useRef();
    const getAllNotCompletedTodos = async () =>{
        const userId = getLoginInfo()?.userId;
        if( userId != null){
            const response = await instance.get(`/todo/findAllNotCompleted/${userId}`);
            setTodos(response.data)
        }
        else{
            toast.info('Вы не авторизованы')
        }


    }

    const saveTodo = async () => {
        if(title.current.value == "") {
            toast.info('Пожалуйста, укажите задачи')
            return;
        }
        const userId = getLoginInfo()?.userId;
        if(userId != null){
            const response = await instance.post(`/todo/${userId}`, {
                title:title.current.value
            });
            getAllNotCompletedTodos()
            title.current.value=""
            toast.success("Задача успешно добавлена")
            setTodos(response.data)
        }else{
            toast.info('Вы не авторизованы')
        }
    }

    React.useEffect(()=>{
        if(todos.length==0)getAllNotCompletedTodos()
    })


    return (
        <div className={'mt-40 flex flex-col justify-center items-center bg-gray-700 text-white'}>
            <h1 className={'mb-10 text-center text-xl'}>
                Мои Задачи
            </h1>

            <form
                onSubmit={(e) => e.preventDefault()}
                className={'mx-auto flex w-1/3 flex-col gap-5'}>
                <input ref={title} type="text" className={'input'} placeholder={'Новая задача'}   />
                <button onClick={saveTodo} className={'btn btn-green mx-auto'}>
                    Добавить задачу
                </button>

                {todos.map((todo) => (
                    <div key={todo.id} className="flex flex-col max-w-screen-2xl bg-gray-800 text-white rounded p-4 mb-4 shadow-lg">
                        <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                        <p className="text-sm mb-2">Дата: {todo.date}</p>
                        <div className="flex justify-between">
                            <div className="flex justify-center
                            ">
                                <button onClick={async () => {
                                    const response = await instance.patch(`/todo/${todo.id}`);
                                    getAllNotCompletedTodos();
                                    toast.success('Задача выполнена')
                                }}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                                    Отметить как выполненное
                                </button>

                                <button onClick={async () => {
                                    const response = await instance.delete(`/todo/${todo.id}`);
                                    getAllNotCompletedTodos();
                                    toast.success('Задача успешно удалена')
                                }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                ))}


            </form>

        </div>
    );
};

export default Todo;
